import React, { useState } from "react";
import Auth from "layouts/Auth";

import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {useAppDispatch} from "../../api/config/config";
import {RootState} from "../../redux/reducers";
import {login} from "../../redux/effects/auth/effects";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
       dispatch(login(email, password));

    } catch (err) {
      setError("Incorrect credentials or connection issues. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <Box className="container mx-auto px-4 h-full">
          <Box className="flex content-center items-center justify-center h-full">
            <Box className="w-full lg:w-4/12 px-4">
              <Box className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <Box className="rounded-t mb-0 px-6 py-6">
                  <Box className="btn-wrapper text-center">
                    <img alt="..." className="w-auto mx-auto" src="/img/logo.png" />
                  </Box>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </Box>
                <Box className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Box className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Iniciar a Sessão</small>
                  </Box>
                  <form>
                    <Box className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                    </Box>

                    <Box className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Palavra-Passe
                      </label>
                      <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                    </Box>

                    <Box className="text-center mt-6">
                      <button
                          onClick={() => handleLogin()}
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="button"
                          disabled={loading} // Disable button when loading
                      >
                        {loading ? (
                            <CircularProgress size={20} color="inherit" /> // Show loading spinner
                        ) : (
                            "Sign In"
                        )}
                      </button>
                    </Box>
                    {error && ( // Display error message when error exists
                        <Box className="text-red-500 text-center mt-2">
                          <Typography variant="body1">{error}</Typography>
                        </Box>
                    )}
                    <Box>
                      <label className="inline-flex items-center cursor-pointer"></label>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
  );
}

Login.layout = Auth;
