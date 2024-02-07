
import OrderDetailComp from "@/components/form-compo/OrderDetailComp";


export default function OrderDetail({ params }: { params: { id: string } }) {


  return (
    <>

      <div className="form-part mt-4 p-1.5">

        <OrderDetailComp id={params.id} />


      </div>

    </>
  )
}
