import { toast } from 'react-toastify'

 export const notify = (text,type) => {
 
    if(type === "success"){
        toast.success(text, {
            position: "top-right",
            theme: "colored",
            })
       
      
    }else{
        toast.error(text,{
            position: "top-right",
            theme: "colored",
            })
        
    }
};
