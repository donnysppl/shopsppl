"use client"
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

type Props = {
    onChange: (data: string) => void;
    name: string;
    value:any;
};

export default function Editor({ onChange, name, value }:Props) {
    let [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []); // run on mounting


    if (loaded) {
        return (
            <CKEditor
                editor={ClassicEditor}
                data={value ? value : name}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        );
    } else {
        return <h2> Editor is loading </h2>;
    }
}