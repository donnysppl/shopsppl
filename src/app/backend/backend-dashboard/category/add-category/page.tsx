import CategoryForm from "@/components/form-compo/CategoryForm";

export default function AddCategory() {

  const formCateFunctData = {
    method: 'POST'
  }

  return (
    <div className='inner-pages-base-div'>
      <div className="head">
        <h2 className='font-medium'>
          Add Category
        </h2>
      </div>

      <div className="form-part mt-4">

        <CategoryForm {...formCateFunctData} />

      </div>
    </div>
  )
}
