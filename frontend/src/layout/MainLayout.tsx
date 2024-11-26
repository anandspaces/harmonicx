import { Container } from "@mui/material";
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  // const isMobile = false;
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <Container  className="flex-1 flex h-full overflow-hidden p-2">
        {/* left sidebar */}
        <Container maxWidth="sm">
          left sidebar
        </Container>

        <Container maxWidth="sm" className="w-2 bg-black rounded-lg transition-colors">
        </Container>

        {/* main content */}
        <Container maxWidth="sm">
          <Outlet />
        </Container>
        
        <Container maxWidth="sm" className="w-2 bg-black rounded-lg transition-colors">
        </Container>

        {/* right sidebar */}
        <Container maxWidth="sm">
          friends activity 
        </Container>
        {/* Main Content */}
      </Container>
    </div>
  )
}

export default MainLayout