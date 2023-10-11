import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import toast from 'react-hot-toast';

interface PageFormProps {
    method: string,
    id?: string,
}

export default function PagesFrom({method,id}:PageFormProps) {

    const [pagesInp, setpagesInp] = useState({
        pagename: '',
        slug: '',
        pagedata: '',
        metatitle: '',
        metadiscription: '',
        metakeyword: '',
    })
    const [loader, setloader] = useState(false)

    useEffect(() => {
        const fetchEditPagesData = async () => {
            setloader(true);
            await fetch(`/api/pages/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        setpagesInp(res.result);
                        toast.success(res.message);
                    }
                    else if (res.status === 400) {
                        toast.error(res.message);
                    }
                    else if (res.status === 500) {
                        toast.error(res.message);
                    }
                    setloader(false);
                })
                .catch(err => {
                    console.log(err);
                })
        } 
        if(id){
            fetchEditPagesData();
        }
    }, [id])
    


    const pageURL = id ? `/api/pages/${id}` : '/api/pages'

    const onPageDataSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setloader(true);
        e.preventDefault()
        await fetch(pageURL,{
            method:method,
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(pagesInp),
        }).then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success(res.message);
                window.location.reload();
            }
            else if (res.status === 400) {
                toast.error(res.message);
            }
            else if (res.status === 500) {
                toast.error(res.message);
            }
            setloader(false);
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <form onSubmit={onPageDataSubmit}>
            <div className="mb-4 form-inp">
                <label htmlFor="pagename" className="form-label">Page Name</label>
                <input type="text" name='pagename' className="form-ctrl" placeholder='Page Name'
                    onChange={(e) => setpagesInp({ ...pagesInp, pagename: e.target.value })}
                    value={'' || pagesInp.pagename}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="slug" className="form-label">Page Slug</label>
                <input type="text" name='slug' className="form-ctrl" placeholder='Page slug'
                    onChange={(e) => setpagesInp({ ...pagesInp, slug: e.target.value })}
                    value={'' || pagesInp.slug}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metatitle" className="form-label">Page metatitle</label>
                <input type="text" name='metatitle' className="form-ctrl" placeholder='Page metatitle'
                    onChange={(e) => setpagesInp({ ...pagesInp, metatitle: e.target.value })}
                    value={'' || pagesInp.metatitle}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metadiscription" className="form-label">Page metadiscription</label>
                <input type="text" name='metadiscription' className="form-ctrl" placeholder='Page metadiscription'
                    onChange={(e) => setpagesInp({ ...pagesInp, metadiscription: e.target.value })}
                    value={'' || pagesInp.metadiscription}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metakeyword" className="form-label">Page metakeyword</label>
                <input type="text" name='metakeyword' className="form-ctrl" placeholder='Page metakeyword'
                    onChange={(e) => setpagesInp({ ...pagesInp, metakeyword: e.target.value })}
                    value={'' || pagesInp.metakeyword}
                />
            </div>
            <div className="mb-4 form-inp">
                <label htmlFor="metakeyword" className="form-label">Page Data Discription</label>
                <div className="ckeditor-bg">
                    <CKEditor
                        editor={ClassicEditor}
                        data={pagesInp.pagedata}
                        onReady={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setpagesInp({ ...pagesInp, pagedata: data })
                        }}
                    />
                </div>
            </div>
            <button type='submit' className='dashboard-btn' >Submit</button>
        </form>
    )
}
