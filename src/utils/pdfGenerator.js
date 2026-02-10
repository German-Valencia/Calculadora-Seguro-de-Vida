import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency } from './format';

export const generatePDF = (data, calculations) => {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor = [0, 35, 102]; // #002366
  
  // Header
  // Ideally load logo image dataUrl here, but for now text
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.setFont('helvetica', 'bold');
  doc.text('Calculadora de Seguro de Vida Ideal', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100);
  doc.text('Your Partner for Life!!', 105, 28, { align: 'center' });

  // Divider
  doc.setDrawColor(200);
  doc.line(14, 32, 196, 32);

  // Client Info
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0);
  doc.text(`Cliente: ${data.name || 'N/A'}`, 14, 42);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 48);

  // Table Data
  // We want to highlight the total calculation logic: (1E + 2C + 3C) - 4C
  const rows = [
    ['1. Reemplazo de Ingresos (1E)', formatCurrency(calculations.incomeReplacement)],
    ['2. Deudas (2C)', formatCurrency(calculations.debts)],
    ['3. Fondo de Educación (3C)', formatCurrency(calculations.education)],
    ['Subtotal Necesidades', formatCurrency(calculations.incomeReplacement + calculations.debts + calculations.education)],
    ['4. Haberes (4C)', `- ${formatCurrency(calculations.assets)}`],
    ['TOTAL SEGURO NECESARIO', formatCurrency(calculations.totalNeed)]
  ];

  autoTable(doc, {
    startY: 55,
    head: [['Concepto', 'Monto (COP)']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: primaryColor, halign: 'center' },
    columnStyles: {
      0: { cellWidth: 120 },
      1: { cellWidth: 60, halign: 'right', fontStyle: 'bold' }
    },
    didParseCell: function (data) {
      // Subtotal styling
      if (data.row.index === 3) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [240, 240, 240];
      }
      // Total styling (last row usually)
      if (data.row.index === 5) {
        data.cell.styles.fillColor = [230, 240, 255];
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.textColor = primaryColor;
        data.cell.styles.fontSize = 12;
      }
    }
  });

  // Footer / Address
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('Consulfines', 105, pageHeight - 15, { align: 'center' });
  doc.text('Bogotá Colombia', 105, pageHeight - 10, { align: 'center' });

  doc.save(`Analisis_${data.name ? data.name.replace(/\s+/g, '_') : 'Seguro'}.pdf`);
};
