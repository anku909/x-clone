
import { initServer } from './app';


async function init(){
  const app = await initServer();
  const PORT = 8000;
  
  app.listen(PORT, () => {
    console.log(`-Local:        http://localhost:${PORT}`);
  });
}


init();

