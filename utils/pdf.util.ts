import PDFDocument from 'pdfkit';
import { UserPdfExportAttributes } from '../models/user.model';

export default (user: UserPdfExportAttributes): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    let pdfBuffer = Buffer.alloc(0);
    const doc = new PDFDocument;
    doc.on('data', (chunk: Buffer) => { pdfBuffer = Buffer.concat([pdfBuffer, chunk]) });
    doc.on('error', reject);
    doc.on('end', () => { resolve(pdfBuffer) });
    doc.text(`${user.firstName} ${user.lastName}`);
    if (user.image)
      doc.image(Buffer.from(user.image, 'base64'));
    doc.end();
  });
};