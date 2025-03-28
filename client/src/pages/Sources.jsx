import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import steamlogo from '../assets/otros/steam-logo.png'
import epiclogo from '../assets/otros/epic.png'

export function Sources() {

    return(
        <div className="sources">
            <div className="s1">
                <div className="s1-logo">
                    <img src={steamlogo} alt="" />
                </div>
                <div className="s1-info">
                    <h2>STEAM</h2>
                    <div className="s1-contet">
                        <p>Steam es una plataforma de distribución digital de videojuegos creada por Valve en 2003. Permite a los usuarios comprar, descargar y gestionar juegos, además de participar en una comunidad en línea para compartir opiniones y logros. Ha cambiado la forma en que los jugadores acceden a los videojuegos, eliminando la necesidad de copias físicas.</p><br />

                        <p>Con millones de usuarios activos y una biblioteca enorme, Steam domina el mercado global de distribución digital en PC. A través de eventos como las rebajas y premios, ha facilitado el acceso tanto a juegos populares como a títulos independientes, consolidando su relevancia en la industria.</p><br />

                        <p>Para los desarrolladores, Steam ofrece herramientas como Steamworks, que facilitan la distribución y gestión de juegos. Steam Direct permite a los creadores publicar títulos fácilmente y llegar a una audiencia global, lo que ha sido fundamental para el éxito de muchos juegos independientes.</p> <br />

                        <a href="https://store.steampowered.com/">VISITAR LA PÁGINA...</a>
                    </div>
                </div>
            </div>
            <div className="s2">
                <div className="s2-info">
                    <h2>EPIC GAMES</h2>
                    <div className="s2-contet">
                        <p>Epic Games es una empresa estadounidense fundada en 1991, conocida por desarrollar el motor gráfico Unreal Engine y juegos populares como Fortnite. En 2018, lanzó la Epic Games Store, una plataforma de distribución digital para videojuegos, con el objetivo de competir con Steam ofreciendo una alternativa para los desarrolladores y jugadores. La tienda ofrece una selección de títulos, tanto propios como de terceros.</p><br />

                        <p>La Epic Games Store ha ganado relevancia en el mercado al ofrecer una división de ingresos más favorable para los desarrolladores, reteniendo solo el 12% de las ganancias frente al 30% que toman otras plataformas como Steam. Esto ha atraído a muchos estudios, además de asegurar exclusividades temporales de títulos importantes. Epic también utiliza su éxito con Fortnite para impulsar su tienda mediante promociones y ofertas gratuitas de juegos.</p><br />

                        <p>En cuanto al apoyo a desarrolladores, Epic Games ofrece un ecosistema que incluye el Unreal Engine, que muchos estudios utilizan para crear videojuegos. Además, la tienda permite a los desarrolladores retener una mayor parte de sus ingresos y ofrece incentivos financieros, como subvenciones a proyectos independientes. Esto ha permitido que la Epic Games Store se convierta en una opción atractiva, especialmente para pequeños desarrolladores.</p><br />

                        <a href="https://store.epicgames.com/">VISITAR LA PÁGINA...</a>
                    </div>
                </div>
                <div className="s2-logo">
                    <img src={epiclogo} alt="" />
                </div>
            </div>
        </div>
    )

}