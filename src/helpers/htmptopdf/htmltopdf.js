import puppeteer from 'puppeteer';

const defaultOpt = {
    format: 'A4',
        printBackground: true,
}

async function htmlToPdf(html, options = defaultOpt) {
    const browser = await puppeteer.launch({ headless: 'new', });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    const pdfBuffer = await page.pdf(options);
    return pdfBuffer;
}
export default htmlToPdf;