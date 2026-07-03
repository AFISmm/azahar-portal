import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute, AdminRoute } from "./auth/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { AppShell } from "./components/AppShell";

import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import MiContrato from "./pages/MiContrato";
import Vacaciones from "./pages/Vacaciones";
import Nomina from "./pages/Nomina";
import MisSolicitudes from "./pages/MisSolicitudes";
import Incapacidades from "./pages/Incapacidades";
import Documentos from "./pages/Documentos";
import Certificados from "./pages/Certificados";

import AdminSolicitudes from "./pages/admin/AdminSolicitudes";
import AdminIncapacidades from "./pages/admin/AdminIncapacidades";
import AdminDocumentos from "./pages/admin/AdminDocumentos";
import AdminEmpleados from "./pages/admin/AdminEmpleados";
import EmpleadoDetalle from "./pages/admin/EmpleadoDetalle";

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                  <Route path="/" element={<Navigate to="/inicio" replace />} />
                  <Route path="/inicio" element={<Inicio />} />
                  <Route path="/mi-contrato" element={<MiContrato />} />
                  <Route path="/vacaciones" element={<Vacaciones />} />
                  <Route path="/nomina" element={<Nomina />} />
                  <Route path="/mis-solicitudes" element={<MisSolicitudes />} />
                  <Route path="/incapacidades" element={<Incapacidades />} />
                  <Route path="/documentos" element={<Documentos />} />
                  <Route path="/certificados" element={<Certificados />} />

                  <Route element={<AdminRoute />}>
                    <Route path="/admin/solicitudes" element={<AdminSolicitudes />} />
                    <Route path="/admin/incapacidades" element={<AdminIncapacidades />} />
                    <Route path="/admin/documentos" element={<AdminDocumentos />} />
                    <Route path="/admin/empleados" element={<AdminEmpleados />} />
                    <Route path="/admin/empleados/:id" element={<EmpleadoDetalle />} />
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}
