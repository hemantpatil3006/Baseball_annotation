
import { usePolygon } from './hooks/usePolygon';
import { ImageCanvas } from './components/ImageCanvas';
import { Toolbar } from './components/Toolbar';
import baseballImage from './assets/baseball.png';

export default function App() {
  const polygonState = usePolygon();

  return (
    <div className="app-container">
      <Toolbar polygonState={polygonState} />
      <main className="main-content">
        <ImageCanvas imageSrc={baseballImage} polygonState={polygonState} />
      </main>
    </div>
  );
}
