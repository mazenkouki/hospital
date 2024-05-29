export const formateDate =(date, config)=>{
    const defaultoptions={day:'numeric', month:'short', year:'numeric'}
    const options= config ? config : defaultoptions
    return new Date(date).toLocaleDateString('en-us', options)

}