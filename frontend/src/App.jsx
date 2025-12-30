import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
