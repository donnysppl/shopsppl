import CategoryForm from "@/components/form-compo/CategoryForm"

type ParamsType = {
  id: string,
}

export default function EditCategory({ params }: { params : ParamsType }) {

  const formFunctData = {
    method : 'PUT',
    id : params.id
  }

  return (
    <div className='inner-pages-base-div'>
            <div className="head">
                <h2 className='font-medium'>
                    Edit Category
                </h2>
            </div>

            <div className="form-part mt-4">
                <CategoryForm {...formFunctData} />
            </div>
        </div>
  )
}
