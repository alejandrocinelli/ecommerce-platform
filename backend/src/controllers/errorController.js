

const errorReq = (req, res) => {
  
    res.render("routing-error");
  };

    export const configureErrorController = {
        errorReq
    }