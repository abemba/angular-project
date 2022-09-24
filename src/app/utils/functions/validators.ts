export function getValidationClass (fieldModel: any) {
    let cssClass = "";
    if(fieldModel.model) {
      if(fieldModel.valid){
        cssClass = "is-valid"
      }else{
        if((fieldModel.invalid)){
          cssClass = "is-invalid"
        }
      }
    }
    return cssClass;
}