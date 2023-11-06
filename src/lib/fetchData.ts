const fetchBlogData = async (page:number,limit:number) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/front?page=${page}&limit=${limit}`)
}