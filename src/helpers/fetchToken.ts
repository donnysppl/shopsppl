

export const adminToken = (cookies:any) => {
    // const cookieData = cookies();
    const admintoken = cookies.get('admin-token')
    const admintokenVal = admintoken?.value;
    console.log((admintokenVal === null) || (admintokenVal === undefined) || (admintokenVal === ''))
    if ((admintokenVal === null) || (admintokenVal === undefined) || (admintokenVal === '')) {
        return false;
    }
    else{
        return true;
    }
}