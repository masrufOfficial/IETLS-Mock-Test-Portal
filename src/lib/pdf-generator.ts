'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Candidate, TestAttempt } from '@/types';
import { getBandDescription } from './ielts-calculator';

/**
 * Generate Official Candidate IELTS TRF (Test Report Form) PDF (FOR ADMIN / OFFICE USE ONLY)
 */
export function generateCandidateTRFPdf(candidate: Candidate, attempt: TestAttempt): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // --- Top Decorative Header Bar (BUBT Royal Blue + IELTS Red) ---
  doc.setFillColor(11, 40, 96); // BUBT Navy Blue
  doc.rect(0, 0, pageWidth, 6, 'F');

  doc.setFillColor(220, 38, 38); // IELTS Red Accent
  doc.rect(0, 6, pageWidth, 2, 'F');

  // --- Institutional Brand Header ---
  doc.setTextColor(11, 40, 96);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('BANGLADESH UNIVERSITY OF BUSINESS AND TECHNOLOGY', pageWidth / 2, 16, { align: 'center' });

  doc.setTextColor(220, 38, 38);
  doc.setFontSize(13);
  doc.text('BUBT TAFE IELTS ACADEMY', pageWidth / 2, 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text('Official Computer-Delivered IELTS Mock Test Report Form (TRF)', pageWidth / 2, 27, { align: 'center' });

  // Thin dividing line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 30, pageWidth - 14, 30);

  // --- Candidate Information Card ---
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 34, pageWidth - 28, 44, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 34, pageWidth - 28, 44, 2, 2, 'S');

  // TRF Reference Tag (Top Right of box)
  doc.setFillColor(11, 40, 96);
  doc.roundedRect(pageWidth - 64, 36, 46, 6, 1, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(`TRF: ${attempt.id || 'BUBT-TRF-01'}`, pageWidth - 41, 40.2, { align: 'center' });

  // Candidate Details Grid
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  const col1 = 18;
  const col2 = 105;
  let rowY = 44;

  // Row 1
  doc.text('Candidate Name:', col1, rowY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 40, 96);
  doc.text(candidate.name, col1 + 30, rowY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Candidate ID:', col2, rowY);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  doc.text(candidate.id, col2 + 25, rowY);

  // Row 2
  rowY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('University / Dept:', col1, rowY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  const uniText = candidate.university.length > 32 ? candidate.university.substring(0, 32) + '...' : candidate.university;
  doc.text(uniText, col1 + 30, rowY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Contact Mobile:', col2, rowY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(candidate.mobile, col2 + 25, rowY);

  // Row 3
  rowY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Email Address:', col1, rowY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(candidate.email, col1 + 30, rowY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Test Date:', col2, rowY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  const testDate = attempt.completedAt ? attempt.completedAt.slice(0, 10) : '2026-10-18';
  doc.text(testDate, col2 + 25, rowY);

  // Row 4
  rowY += 7;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Address:', col1, rowY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  const addressText = candidate.address.length > 70 ? candidate.address.substring(0, 70) + '...' : candidate.address;
  doc.text(addressText, col1 + 30, rowY);

  // --- Assessment Results Header ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(11, 40, 96);
  doc.text('OFFICIAL TEST RESULTS & IELTS BAND SCORES', 14, 85);

  // --- Score Matrix Grid ---
  const matrixY = 90;
  const boxWidth = 34;
  const boxHeight = 28;
  const spacing = 3;

  const modules = [
    { label: 'LISTENING', score: attempt.scores.listening.bandScore.toFixed(1), sub: `Raw: ${attempt.scores.listening.rawScore}/40` },
    { label: 'READING', score: attempt.scores.reading.bandScore.toFixed(1), sub: `Raw: ${attempt.scores.reading.rawScore}/40` },
    { label: 'WRITING', score: attempt.scores.writing.bandScore.toFixed(1), sub: `Task 1 & 2` },
    { label: 'SPEAKING', score: attempt.scores.speaking.bandScore.toFixed(1), sub: `Parts 1, 2, 3` },
  ];

  // 4 Module Boxes
  modules.forEach((mod, idx) => {
    const x = 14 + idx * (boxWidth + spacing);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, matrixY, boxWidth, boxHeight, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, matrixY, boxWidth, boxHeight, 2, 2, 'S');

    // Header strip
    doc.setFillColor(241, 245, 249);
    doc.rect(x, matrixY, boxWidth, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(mod.label, x + boxWidth / 2, matrixY + 5, { align: 'center' });

    // Score
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(11, 40, 96);
    doc.text(mod.score, x + boxWidth / 2, matrixY + 18, { align: 'center' });

    // Subtext
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(mod.sub, x + boxWidth / 2, matrixY + 24, { align: 'center' });
  });

  // Overall Band Score Box (BUBT Navy with IELTS Red badge)
  const overallX = 14 + 4 * (boxWidth + spacing);
  const overallWidth = pageWidth - 14 - overallX;
  doc.setFillColor(220, 38, 38); // IELTS Red
  doc.roundedRect(overallX, matrixY, overallWidth, boxHeight, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(254, 202, 202);
  doc.text('OVERALL BAND', overallX + overallWidth / 2, matrixY + 6.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text(attempt.overallBandScore.toFixed(1), overallX + overallWidth / 2, matrixY + 18.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(attempt.cefrLevel || 'C1 Advanced', overallX + overallWidth / 2, matrixY + 24.5, { align: 'center' });

  // --- Official CEFR & Competence Description ---
  const descY = 123;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, descY, pageWidth - 28, 22, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, descY, pageWidth - 28, 22, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 40, 96);
  doc.text('Band Descriptor & CEFR Competence Level:', 18, descY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const bandDesc = getBandDescription(attempt.overallBandScore);
  const splitDesc = doc.splitTextToSize(bandDesc, pageWidth - 36);
  doc.text(splitDesc, 18, descY + 11.5);

  // --- Examiner Remarks Table ---
  const feedbackY = 150;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 40, 96);
  doc.text('EXAMINER REMARKS & PERFORMANCE EVALUATION', 14, feedbackY);

  autoTable(doc, {
    startY: feedbackY + 3,
    head: [['Assessment Module', 'Evaluation & Examiner Comments', 'Awarded Band']],
    body: [
      ['Listening Test', `Completed 4 sections (40 questions). Raw Score: ${attempt.scores.listening.rawScore}/40. Strong performance in both everyday social and academic seminar contexts.`, attempt.scores.listening.bandScore.toFixed(1)],
      ['Reading Test', `Completed 3 Academic Passages (40 questions). Raw Score: ${attempt.scores.reading.rawScore}/40. High accuracy in True/False/Not Given and academic comprehension.`, attempt.scores.reading.bandScore.toFixed(1)],
      ['Writing Test', attempt.scores.writing.feedback || `Task 1: ${attempt.scores.writing.task1WordCount} words. Task 2: ${attempt.scores.writing.task2WordCount} words. Solid organization and broad academic lexical resource.`, attempt.scores.writing.bandScore.toFixed(1)],
      ['Speaking Test', attempt.scores.speaking.feedback || `Assessed across Fluency, Lexical Resource, Grammar, and Pronunciation. Fluent delivery with clear intonation.`, attempt.scores.speaking.bandScore.toFixed(1)],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [11, 40, 96], // BUBT Navy
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    styles: {
      fontSize: 7.5,
      textColor: [51, 65, 85],
      cellPadding: 2.5,
      overflow: 'linebreak',
    },
    columnStyles: {
      0: { cellWidth: 28, fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 24, halign: 'center', fontStyle: 'bold', textColor: [220, 38, 38] },
    },
    margin: { left: 14, right: 14 },
  });

  // Position after table
  // @ts-expect-error autoTable adds lastAutoTable to doc
  const finalY = doc.lastAutoTable.finalY + 8;

  // --- Verification Seal & Signatures ---
  const signY = Math.min(finalY, pageHeight - 45);

  // Verification Box
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(14, signY, 52, 22, 1.5, 1.5, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(220, 38, 38);
  doc.text('OFFICIAL SEAL & VERIFICATION', 40, signY + 6, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('BUBT TAFE Academic Council', 40, signY + 11, { align: 'center' });
  doc.text(`Verify Online: bubt.edu.bd/tafe`, 40, signY + 15, { align: 'center' });
  doc.text(`Candidate Ref: ${candidate.id}`, 40, signY + 19, { align: 'center' });

  // Signature 1: Academic Coordinator
  doc.setDrawColor(11, 40, 96);
  doc.setLineWidth(0.5);
  doc.line(80, signY + 15, 125, signY + 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(11, 40, 96);
  doc.text('Academic Coordinator', 102.5, signY + 19, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text('BUBT TAFE IELTS Academy', 102.5, signY + 23, { align: 'center' });

  // Signature 2: Developer & Lead Masruf Rahman
  doc.line(145, signY + 15, 196, signY + 15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(11, 40, 96);
  doc.text('Masruf Rahman', 170.5, signY + 19, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(220, 38, 38);
  doc.text('Lead Developer (masrufrahman.info)', 170.5, signY + 23, { align: 'center' });

  // --- Official Footer ---
  doc.setFillColor(11, 40, 96);
  doc.rect(0, pageHeight - 9, pageWidth, 9, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(241, 245, 249);
  doc.text(
    'Product of BUBT TAFE & Developed by Masruf Rahman [www.masrufrahman.info]  |  Plot # 77-78, Rupnagar, Mirpur-2, Dhaka-1216',
    pageWidth / 2,
    pageHeight - 3.5,
    { align: 'center' }
  );

  // Save the PDF
  const filename = `BUBT_IELTS_TRF_${candidate.id}_${candidate.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
}

/**
 * Generate Student Examination Submission Slip PDF (NO SCORES DISPLAYED)
 * Students take this slip to Room 307, Building 01 to collect their official TRF.
 */
export function generateCandidateSubmissionSlipPdf(candidate: Candidate, attempt: TestAttempt): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Top Accent Bar (Royal Blue & Red)
  doc.setFillColor(11, 40, 96);
  doc.rect(0, 0, pageWidth, 6, 'F');
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 6, pageWidth, 2, 'F');

  // Header
  doc.setTextColor(11, 40, 96);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('BANGLADESH UNIVERSITY OF BUSINESS AND TECHNOLOGY', pageWidth / 2, 18, { align: 'center' });

  doc.setTextColor(220, 38, 38);
  doc.setFontSize(13);
  doc.text('BUBT TAFE IELTS ACADEMY', pageWidth / 2, 24, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text('Official Examination Submission Slip & Office Collection Receipt', pageWidth / 2, 30, { align: 'center' });

  doc.setDrawColor(203, 213, 225);
  doc.line(14, 34, pageWidth - 14, 34);

  // Notice Alert Banner
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(14, 38, pageWidth - 28, 22, 2, 2, 'F');
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(14, 38, pageWidth - 28, 22, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(185, 28, 28);
  doc.text('OFFICIAL NOTICE: TRF COLLECTION FROM BUBT TAFE OFFICE', 18, 44);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(127, 29, 29);
  const noticeLines = doc.splitTextToSize(
    'Your computer-delivered IELTS Mock Test has been successfully submitted and stored for examiner evaluation. As per academy regulations, verified band scores and the printed Test Report Form (TRF) must be collected in person from the BUBT TAFE Office Room (Room 307, Building 01). Please bring this slip with your Candidate ID.',
    pageWidth - 36
  );
  doc.text(noticeLines, 18, 49);

  // Candidate Details Box
  const boxY = 66;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, boxY, pageWidth - 28, 62, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, boxY, pageWidth - 28, 62, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(11, 40, 96);
  doc.text('CANDIDATE & EXAMINATION RECORD', 18, boxY + 8);

  const col1 = 18;
  const col2 = 110;
  let row = boxY + 16;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);

  // Field 1
  doc.text('Candidate Name:', col1, row);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(candidate.name, col1 + 35, row);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Candidate ID:', col2, row);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(220, 38, 38);
  doc.text(candidate.id, col2 + 25, row);

  // Field 2
  row += 8;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('University / Dept:', col1, row);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(candidate.university, col1 + 35, row);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Contact Mobile:', col2, row);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(candidate.mobile, col2 + 25, row);

  // Field 3
  row += 8;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Test Title:', col1, row);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(attempt.testTitle, col1 + 35, row);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Submission Date:', col2, row);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(attempt.completedAt ? attempt.completedAt.slice(0, 10) : '2026-10-18', col2 + 25, row);

  // Field 4
  row += 8;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Evaluation Status:', col1, row);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('Transmitted to Examiner Board', col1 + 35, row);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Office Room:', col2, row);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(11, 40, 96);
  doc.text('Room 307, Building 01', col2 + 25, row);

  // Field 5
  row += 8;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('Student Address:', col1, row);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(15, 23, 42);
  doc.text(candidate.address, col1 + 35, row);

  // Examination Modules Taken Table
  autoTable(doc, {
    startY: boxY + 70,
    head: [['Module Name', 'Questions / Format', 'Status', 'Office TRF Availability']],
    body: [
      ['Listening Test', '40 Questions (4 Audio Sections)', 'Submitted & Stored', 'Printed on Official TRF'],
      ['Academic Reading', '40 Questions (3 Academic Passages)', 'Submitted & Stored', 'Printed on Official TRF'],
      ['Academic Writing', 'Task 1 (Report) & Task 2 (Essay)', 'Submitted & Stored', 'Printed on Official TRF'],
      ['IELTS Speaking', 'Parts 1, 2, 3 (Audio Recording / Interview)', 'Submitted & Stored', 'Printed on Official TRF'],
    ],
    theme: 'grid',
    headStyles: {
      fillColor: [11, 40, 96],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
    },
    styles: {
      fontSize: 7.5,
      textColor: [51, 65, 85],
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 35, fontStyle: 'bold' },
      1: { cellWidth: 65 },
      2: { cellWidth: 40, textColor: [16, 185, 129], fontStyle: 'bold' },
      3: { cellWidth: 'auto', fontStyle: 'bold', textColor: [11, 40, 96] },
    },
    margin: { left: 14, right: 14 },
  });

  // Verification & Instructions
  const insY = 180;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(14, insY, pageWidth - 28, 48, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, insY, pageWidth - 28, 48, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(11, 40, 96);
  doc.text('Collection Protocol & Next Steps:', 18, insY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  const steps = [
    '1. Evaluation Timeline: Academic faculty evaluate writing essays and speaking recordings within 24 to 48 hours.',
    '2. Physical Collection: Visit BUBT TAFE Examination Center, Room 307, Building 01, Mirpur-2, Dhaka (Phone: 01827459921).',
    '3. Identity Verification: Display this digital or printed slip with Candidate ID: ' + candidate.id + '.',
    '4. TRF Handover: The duty coordinator will issue your embossed official IELTS Test Report Form.',
  ];
  steps.forEach((st, i) => {
    doc.text(st, 18, insY + 14 + i * 7);
  });

  // Footer
  doc.setFillColor(11, 40, 96);
  doc.rect(0, pageHeight - 9, pageWidth, 9, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(241, 245, 249);
  doc.text(
    'Product of BUBT TAFE & Developed by Masruf Rahman [www.masrufrahman.info]  |  Plot # 77-78, Rupnagar, Mirpur-2, Dhaka-1216',
    pageWidth / 2,
    pageHeight - 3.5,
    { align: 'center' }
  );

  doc.save(`BUBT_IELTS_Submission_Slip_${candidate.id}.pdf`);
}

/**
 * Generate Master Batch Summary PDF for Admin Dashboard
 */
export function generateBatchSummaryPdf(candidates: Candidate[], attempts: TestAttempt[]): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Top Accent Bar (Royal Blue & IELTS Red)
  doc.setFillColor(11, 40, 96);
  doc.rect(0, 0, pageWidth, 5, 'F');
  doc.setFillColor(220, 38, 38);
  doc.rect(0, 5, pageWidth, 2, 'F');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(11, 40, 96);
  doc.text('BUBT TAFE IELTS ACADEMY — MOCK TEST MASTER RESULT SHEET', 14, 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  const exportDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  doc.text(`Official Candidates Batch Performance & Module Score Summary Report  |  Generated on: ${exportDate}`, 14, 21);

  // Calculate Batch Metrics
  const totalCount = candidates.length;
  const attemptsWithScores = attempts.filter((a) => a.overallBandScore > 0);
  const avgOverall = attemptsWithScores.length > 0
    ? (attemptsWithScores.reduce((acc, curr) => acc + curr.overallBandScore, 0) / attemptsWithScores.length).toFixed(2)
    : '0.0';
  const highestBand = attemptsWithScores.length > 0
    ? Math.max(...attemptsWithScores.map((a) => a.overallBandScore)).toFixed(1)
    : '0.0';
  const passRate = attemptsWithScores.length > 0
    ? Math.round((attemptsWithScores.filter((a) => a.overallBandScore >= 6.5).length / attemptsWithScores.length) * 100)
    : 0;

  // Executive KPI summary boxes
  const kpis = [
    { label: 'Total Candidates', value: `${totalCount}` },
    { label: 'Batch Average Band', value: `${avgOverall}` },
    { label: 'Highest Band Score', value: `${highestBand}` },
    { label: 'Target Rate (Band 6.5+)', value: `${passRate}%` },
  ];

  const boxW = 63;
  const boxH = 14;
  kpis.forEach((kpi, idx) => {
    const x = 14 + idx * (boxW + 6);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(x, 25, boxW, boxH, 1.5, 1.5, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, 25, boxW, boxH, 1.5, 1.5, 'S');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(kpi.label, x + 4, 30);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(220, 38, 38);
    doc.text(kpi.value, x + 4, 36);
  });

  // Build Table Data
  const tableRows = candidates.map((candidate, idx) => {
    const attempt = attempts.find((a) => a.candidateId === candidate.id) || {
      scores: {
        listening: { bandScore: 0 },
        reading: { bandScore: 0 },
        writing: { bandScore: 0 },
        speaking: { bandScore: 0 },
      },
      overallBandScore: 0,
      cefrLevel: 'Pending',
      status: 'pending',
      completedAt: candidate.registeredAt,
    };

    return [
      idx + 1,
      candidate.id,
      candidate.name,
      candidate.university,
      candidate.mobile,
      attempt.scores.listening.bandScore > 0 ? attempt.scores.listening.bandScore.toFixed(1) : '-',
      attempt.scores.reading.bandScore > 0 ? attempt.scores.reading.bandScore.toFixed(1) : '-',
      attempt.scores.writing.bandScore > 0 ? attempt.scores.writing.bandScore.toFixed(1) : '-',
      attempt.scores.speaking.bandScore > 0 ? attempt.scores.speaking.bandScore.toFixed(1) : '-',
      attempt.overallBandScore > 0 ? attempt.overallBandScore.toFixed(1) : 'Pending',
      attempt.cefrLevel || '-',
      candidate.registeredAt ? candidate.registeredAt.slice(0, 10) : '2026-10-18',
    ];
  });

  autoTable(doc, {
    startY: 43,
    head: [[
      '#',
      'Candidate ID',
      'Candidate Name',
      'University / Department',
      'Mobile No',
      'L',
      'R',
      'W',
      'S',
      'Overall',
      'CEFR Level',
      'Registered',
    ]],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [11, 40, 96], // BUBT Navy Blue
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8,
      halign: 'center',
    },
    styles: {
      fontSize: 7.5,
      textColor: [30, 41, 59],
      cellPadding: 2,
    },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 26, fontStyle: 'bold' },
      2: { cellWidth: 38, fontStyle: 'bold' },
      3: { cellWidth: 50 },
      4: { cellWidth: 28 },
      5: { cellWidth: 10, halign: 'center' },
      6: { cellWidth: 10, halign: 'center' },
      7: { cellWidth: 10, halign: 'center' },
      8: { cellWidth: 10, halign: 'center' },
      9: { cellWidth: 18, halign: 'center', fontStyle: 'bold', textColor: [220, 38, 38] },
      10: { cellWidth: 26, halign: 'center' },
      11: { cellWidth: 22, halign: 'center' },
    },
    margin: { left: 14, right: 14 },
  });

  // Footer
  doc.setFillColor(11, 40, 96);
  doc.rect(0, pageHeight - 8, pageWidth, 8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(241, 245, 249);
  doc.text(
    'BUBT TAFE IELTS Academy Master Records  |  Product of BUBT TAFE & Developed by Masruf Rahman [www.masrufrahman.info]',
    pageWidth / 2,
    pageHeight - 2.8,
    { align: 'center' }
  );

  const filename = `BUBT_IELTS_Master_Batch_Summary.pdf`;
  doc.save(filename);
}

/**
 * Export Candidate Records to CSV Format
 */
export function exportBatchSummaryCsv(candidates: Candidate[], attempts: TestAttempt[]): void {
  const headers = [
    'Sl No',
    'Candidate ID',
    'Candidate Name',
    'Email',
    'Mobile',
    'University',
    'Address',
    'Listening Band',
    'Reading Band',
    'Writing Band',
    'Speaking Band',
    'Overall Band',
    'CEFR Level',
    'Registration Date',
  ];

  const rows = candidates.map((candidate, idx) => {
    const attempt = attempts.find((a) => a.candidateId === candidate.id);
    return [
      idx + 1,
      `"${candidate.id}"`,
      `"${candidate.name}"`,
      `"${candidate.email}"`,
      `"${candidate.mobile}"`,
      `"${candidate.university}"`,
      `"${candidate.address.replace(/"/g, '""')}"`,
      attempt?.scores.listening.bandScore || 0,
      attempt?.scores.reading.bandScore || 0,
      attempt?.scores.writing.bandScore || 0,
      attempt?.scores.speaking.bandScore || 0,
      attempt?.overallBandScore || 0,
      `"${attempt?.cefrLevel || 'Pending'}"`,
      `"${candidate.registeredAt}"`,
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `BUBT_IELTS_Candidates_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
