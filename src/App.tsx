import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute, ModuloRoute } from "./auth/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AppShell } from "./components/AppShell";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import InicioMercado from "./pages/InicioMercado";
import CadenaProduccion from "./pages/CadenaProduccion";
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
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminNomina from "./pages/admin/AdminNomina";
import GestionPqr from "./pages/admin/GestionPqr";
import MiPerfil from "./pages/MiPerfil";

import GestionEstrategica from "./pages/GestionEstrategica";
import GestionComercial from "./pages/GestionComercial";
import GestionOperativa from "./pages/GestionOperativa";
import InformacionGeneral from "./pages/InformacionGeneral";

import LotePublico from "./pages/LotePublico";
import TrazInicio from "./pages/trazabilidad/TrazInicio";
import TrazFinca from "./pages/trazabilidad/TrazFinca";
import TrazFincaDetalle from "./pages/trazabilidad/TrazFincaDetalle";
import TrazCertificacion from "./pages/trazabilidad/TrazCertificacion";
import TrazLoteVerde from "./pages/trazabilidad/TrazLoteVerde";
import TrazLoteVerdeDetalle from "./pages/trazabilidad/TrazLoteVerdeDetalle";
import TrazFichaCata from "./pages/trazabilidad/TrazFichaCata";
import TrazLoteTostado from "./pages/trazabilidad/TrazLoteTostado";
import TrazLoteEmpaque from "./pages/trazabilidad/TrazLoteEmpaque";
import TrazLoteEmpaqueDetalle from "./pages/trazabilidad/TrazLoteEmpaqueDetalle";
import TrazAuditoria from "./pages/trazabilidad/TrazAuditoria";
import PosVenta from "./pages/pos/PosVenta";
import PosCocina from "./pages/pos/PosCocina";
import PosHistorial from "./pages/pos/PosHistorial";

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ToastProvider>
          <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              {/* Ficha pública del QR de la bolsa: sin sesión. */}
              <Route path="/lote/:id" element={<LotePublico />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<AppShell />}>
                  <Route path="/" element={<Navigate to="/inicio" replace />} />
                  <Route path="/inicio" element={<InicioMercado />} />
                  <Route path="/cadena-produccion" element={<CadenaProduccion />} />

                  <Route path="/nomina" element={<Navigate to="/nomina/inicio" replace />} />
                  <Route path="/nomina/inicio" element={<Inicio />} />
                  <Route path="/nomina/mi-contrato" element={<MiContrato />} />
                  <Route path="/nomina/vacaciones" element={<Vacaciones />} />
                  <Route path="/nomina/pagos" element={<Nomina />} />
                  <Route path="/nomina/mis-solicitudes" element={<MisSolicitudes />} />
                  <Route path="/nomina/incapacidades" element={<Incapacidades />} />
                  <Route path="/nomina/documentos" element={<Documentos />} />
                  <Route path="/nomina/certificados" element={<Certificados />} />

                  <Route path="/mi-perfil" element={<MiPerfil />} />

                  {/* Trazabilidad: el acceso lo decide empleado.permisosModulos.trazabilidad (ver / editar; cada página lo valida y la API también). */}
                  <Route path="/trazabilidad" element={<TrazInicio />} />
                  <Route path="/trazabilidad/finca" element={<TrazFinca />} />
                  <Route path="/trazabilidad/finca/:id" element={<TrazFincaDetalle />} />
                  <Route path="/trazabilidad/certificacion" element={<TrazCertificacion />} />
                  <Route path="/trazabilidad/lote-verde" element={<TrazLoteVerde />} />
                  <Route path="/trazabilidad/lote-verde/:id" element={<TrazLoteVerdeDetalle />} />
                  <Route path="/trazabilidad/ficha-cata" element={<TrazFichaCata />} />
                  <Route path="/trazabilidad/lote-tostado" element={<TrazLoteTostado />} />
                  <Route path="/trazabilidad/lote-empaque" element={<TrazLoteEmpaque />} />
                  <Route path="/trazabilidad/lote-empaque/:id" element={<TrazLoteEmpaqueDetalle />} />
                  <Route path="/trazabilidad/auditoria" element={<TrazAuditoria />} />

                  {/* POS: el acceso lo decide empleado.permisosModulos.pos (ver / editar; cada pagina lo valida y la API tambien). */}
                  <Route path="/pos" element={<PosVenta />} />
                  <Route path="/pos/cocina" element={<PosCocina />} />
                  <Route path="/pos/historial" element={<PosHistorial />} />

                  {/* RRHH y nómina */}
                  <Route element={<ModuloRoute modulos="rrhh" />}>
                    <Route path="/admin/solicitudes" element={<AdminSolicitudes />} />
                    <Route path="/admin/incapacidades" element={<AdminIncapacidades />} />
                    <Route path="/admin/documentos" element={<AdminDocumentos />} />
                    <Route path="/admin/empleados" element={<AdminEmpleados />} />
                    <Route path="/admin/empleados/:id" element={<EmpleadoDetalle />} />
                    <Route path="/admin/nomina" element={<AdminNomina />} />
                  </Route>

                  {/* Gestión de usuarios (y PQR, que la atienden las cuentas de desarrollador o quien gestiona usuarios) */}
                  <Route element={<ModuloRoute modulos="usuarios" />}>
                    <Route path="/admin/usuarios" element={<AdminUsuarios />} />
                  </Route>
                  <Route path="/admin/pqr" element={<GestionPqr />} />

                  {/* Gestión del negocio */}
                  <Route element={<ModuloRoute modulos="negocio" />}>
                    <Route path="/gestion-estrategica" element={<GestionEstrategica />} />
                    <Route path="/gestion-comercial" element={<GestionComercial />} />
                    <Route path="/gestion-operativa" element={<GestionOperativa />} />
                    <Route path="/informacion-general" element={<InformacionGeneral />} />
                  </Route>
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
