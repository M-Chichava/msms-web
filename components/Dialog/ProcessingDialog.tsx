import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";

const ProcessingDialog = ({ open, onClose, fetchStatus, error }) => {
    return (
        <Dialog open={open} onClose={onClose} className="">
            <div>
                <div className="block pt-6 w-12/12 text-center ">
                    <CircularProgress sx={{color: '#003d57'}} size={60} />
                </div>
            </div>
            <DialogTitle>Processando...</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Aguarde enquanto o processo está em andamento.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {fetchStatus === "success" ? (
                    <>
                        <CheckIcon fontSize="large" color="success" />
                        <DialogContentText>Pedido Submetido com sucesso</DialogContentText>
                        <Button
                            onClick={onClose}
                            style={{
                                backgroundColor: "#003d57",
                                color: "#fff",
                                paddingTop: ".8em",
                                paddingBottom: ".8em",
                                paddingLeft: "2em",
                                paddingRight: "2em",
                            }}
                        >
                            OK
                        </Button>
                    </>
                ) : fetchStatus === "error" ? (
                    <>
                        <ErrorIcon fontSize="large" color="error" />
                        <DialogContentText>Erro ao Submeter a requisição</DialogContentText>
                        <DialogContentText>Error Details: {error.message}</DialogContentText>
                        <Button
                            onClick={onClose}
                            style={{
                                backgroundColor: "#d50822",
                                color: "#fff",
                                paddingTop: ".8em",
                                paddingBottom: ".8em",
                                paddingLeft: "2em",
                                paddingRight: "2em",
                            }}
                        >
                            Fechar
                        </Button>
                    </>
                ) : null}

            </DialogActions>
        </Dialog>
    );
};

export default ProcessingDialog;
