import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { IClient } from '../../providers/ClientContext/@types';
import { IContact } from '../../providers/ContactsContext/@types';

export function generateClientPDF(client: IClient, contacts: IContact[]) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(`Contatos de ${client.fullName}`, 105, 20, { align: 'center' });

  const tableBody = contacts.map(contact => [
    contact.fullName,
    contact.email,
    contact.telephone,
  ]);

  (doc as any).autoTable({
    head: [['Nome', 'E-mail', 'Telefone']],
    body: tableBody,
    startY: 30,
    styles: {
      fontSize: 10,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [22, 160, 133],
      textColor: [255, 255, 255],
    },
  });

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(`Página ${i} de ${pageCount}`, 200, 290, { align: 'right' });
  }

  doc.save(`Relatorio-${client.fullName}.pdf`);
}
