import { NextRequest, NextResponse } from "next/server";
import htmlToPdf from '@/helpers/htmptopdf/htmltopdf';

export async function GET(req: NextRequest) {
    try {
       const buffer = await htmlToPdf('<html><body><h1>text sec</h1></body></html>');
    //    console.log(buffer)

       return new NextResponse(buffer, {
        headers: {
            'Content-Type': 'application/pdf',
            // 'Content-Disposition': 'attachment; filename=invoice.pdf'
        }
    });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Somthing went wrong ' + error,
        }, { status: 500 })
    }
}