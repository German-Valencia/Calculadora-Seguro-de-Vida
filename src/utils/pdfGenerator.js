import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCurrency } from "./format";

const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Handle potential CORS if needed
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
  });
};

export const generatePDF = async (data, calculations, trm) => {
  const doc = new jsPDF();

  // Colors
  const primaryColor = [0, 35, 102]; // #002366

  // Load Logo
  try {
    const logoImg = await loadImage("/consulfines.png");
    // Calculate aspect ratio to fit width 50 (max) or height 20 (max)
    const maxWidth = 60;
    const maxHeight = 25;
    let width = logoImg.width;
    let height = logoImg.height;

    // Scale down if needed
    if (width > maxWidth) {
      height = (maxWidth / width) * height;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = (maxHeight / height) * width;
      height = maxHeight;
    }

    // Center logic: Page width is 210mm. Center is 105.
    // x = 105 - (width / 2)
    doc.addImage(logoImg, "PNG", 105 - width / 2, 10, width, height);
  } catch (error) {
    console.warn("Logo could not be loaded", error);
    // Fallback text if logo fails
    doc.setFontSize(22);
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("CONSULFINES", 105, 20, { align: "center" });
  }

  // Header Text
  doc.setFontSize(18);
  doc.setTextColor(...primaryColor);
  doc.setFont("helvetica", "bold");
  // Position below logo (approx 10 + height(25) + gap(5) = 40)
  doc.text("Calculadora de Seguro de Vida Ideal", 105, 42, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100);
  doc.text("Your Partner for Life!!", 105, 48, { align: "center" });

  // Divider
  doc.setDrawColor(200);
  doc.line(14, 52, 196, 52);

  // Client Info
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(0);
  doc.text(`Cliente: ${data.name || "N/A"}`, 14, 60);
  doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 66);
  if (trm) {
    doc.text(`TRM Base: ${formatCurrency(trm)}`, 14, 72);
  }

  // Calculation Logic for USD
  // Calculation Logic for USD
  const totalUSD = trm > 0 ? calculations.totalNeed / trm : 0;
  const totalNeedStr = formatCurrency(calculations.totalNeed);

  // Format USD manually to avoid locale issues and cleaner look
  // Use es-CO for number formatting (1.234,56) but add symbol manually
  const usdFormatter = new Intl.NumberFormat("es-CO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const totalNeedUSDStr = `$ ${usdFormatter.format(totalUSD)} USD`;

  // Table Data
  const rows = [
    [
      "1. Reemplazo de Ingresos (1E)",
      formatCurrency(calculations.incomeReplacement),
    ],
    ["2. Deudas (2C)", formatCurrency(calculations.debts)],
    ["3. Fondo de Educación (3C)", formatCurrency(calculations.education)],
    [
      "Subtotal Necesidades",
      formatCurrency(
        calculations.incomeReplacement +
          calculations.debts +
          calculations.education,
      ),
    ],
    ["4. Haberes (4C)", `- ${formatCurrency(calculations.assets)}`],
    ["TOTAL SEGURO NECESARIO", `${totalNeedStr}\n${totalNeedUSDStr}`],
  ];

  autoTable(doc, {
    startY: 80,
    head: [["Concepto", "Monto"]],
    body: rows,
    theme: "grid",
    headStyles: { fillColor: primaryColor, halign: "center" },
    columnStyles: {
      0: { cellWidth: 120, valign: "middle" },
      1: {
        cellWidth: 60,
        halign: "right",
        valign: "middle",
        fontStyle: "bold",
      },
    },
    didParseCell: function (data) {
      // Subtotal styling
      if (data.row.index === 3) {
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.fillColor = [245, 245, 245];
      }
      // Total styling (last row usually)
      if (data.row.index === 5) {
        data.cell.styles.fillColor = [230, 240, 255];
        data.cell.styles.fontStyle = "bold";
        data.cell.styles.textColor = primaryColor;
        data.cell.styles.fontSize = 12;
      }
    },
  });

  // Footer / Address
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Consulfines", 105, pageHeight - 15, { align: "center" });
  doc.text("Bogotá | Colombia", 105, pageHeight - 10, { align: "center" });

  doc.save(
    `Analisis_${data.name ? data.name.replace(/\s+/g, "_") : "Seguro"}.pdf`,
  );
};
