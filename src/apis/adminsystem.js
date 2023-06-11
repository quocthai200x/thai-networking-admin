import axios from "@/axios"


export const switchEnableAnDisableACompany = async ({business_id}) =>{
    try {
        let res = await axios.put(`/admin-system/allow-business?businessId=${business_id}`)
        if(res.status == 200){
            return res.data 
        }else{
            throw new Error(res.data)
        }
    } catch (error) {
        console.log(error)
    }
}

