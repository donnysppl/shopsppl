"use client";

export default function Product360() {


    return (
        <>
            <div className="fixed inset-0 bg-black/25 z-10" />
            <div className='threesix-product-outer'>
                <div className="heading">
                    <h4 className="text-lg text-center font-semibold">3D Product View</h4>
                </div>
                <div className="w-[500px] h-[500px] mx-auto">
                    <div
                        className="cloudimage-360"
                        id="Product"
                        data-folder="https://cloud.shopsppl.com/wp-content/uploads/sppl/thomson/product/Q50H1000/3dview/"
                        data-filename-x="{index}.webp"
                        data-amount-x="72"
                        data-transformation="w=400&h=200&func=fit"
                    ></div>
                </div>

            </div>
        </>
    )
}
