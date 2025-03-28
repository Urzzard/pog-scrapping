import { useEffect, useState } from "react";
import { getAllSteamData } from "../api/steam-dg-api";
import { getAllEpicData } from "../api/epic-dg-api";
import { useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import steamlogo from '../assets/otros/steam-logo.png';
import epiclogo from '../assets/otros/epic.png';

export function Inicio(){

    const [steamdata, setSteamdata] = useState([]);
    const [epicdata, setEpicdata] = useState([]);
    const [steamFilteredData, setSteamFilteredData] = useState([]);

    useEffect(() =>{
        async function loadSteamData() {
            const res = await getAllSteamData();
            setSteamdata(res.data)
            const validData = res.data

            const sortedData = validData.filter(item=>item.nprice !== item.oprice).map(item => ({
                ...item, discount: Math.round(((steamdata.nprice-steamdata.oprice)/steamdata.nprice)*100.0)
            })).sort((a,b) => a.discount - b.discount).slice(0,5)

            setSteamFilteredData(sortedData)
        }
        loadSteamData();
    }, [])

    useEffect(() =>{
        async function loadEpicData() {
            const res = await getAllEpicData();
            setEpicdata(res.data)
        }
        loadEpicData();
    }, [])


    return(
        <div className="index">
            <div className="top-games">
                {steamFilteredData.map(steamdata =>(
                    steamdata.nprice !== steamdata.oprice && (
                        <div className={"tg "+steamdata.id} key={steamdata.id}>
                            <img className="tg-img" src={steamdata.img} alt="" />
                            <div className="tg-name">
                                <h3>{steamdata.name}</h3>
                            </div>
                            <div className="tg-offer">
                                -{Math.round(((steamdata.nprice-steamdata.oprice)/steamdata.nprice)*100.0)}%
                            </div>
                        </div>
                    )
                    
                ))}
            </div>
            <div className="second-content">
                <div className="sub-division1">
                    <h2>LAS MEJORES OFERTAS EN VIDEOJUEGOS DE LAS PAGINAS MAS CONOCIDAS...!</h2>
                </div>

                <div className="sub-division2">
                    <img src={steamlogo} alt="" />
                    <h2>STEAM</h2>
                </div>

                <div className="game-content">
                    {steamdata
                    .filter(steamdata => steamdata.nprice !== steamdata.oprice)
                    .slice(5, 29).map(steamdata =>(
                        
                        <a href={steamdata.link} className={"g-index "+steamdata.id} key={steamdata.id}>
                            <div className="game-index-offer">
                                -{Math.round(((steamdata.nprice-steamdata.oprice)/steamdata.nprice)*100.0)}%
                            </div>
                            <img className="game-index-img-steam" src={steamdata.img} alt="" />
                            <div className="game-index-info">
                                <div className="game-index-name">
                                    <h3>{steamdata.name}</h3>
                                </div>
                                <div className="game-index-price">
                                    <span className="gi-normal">S/. {steamdata.nprice}</span>
                                    {steamdata.oprice <=0 ? <span className="gi-offer">GRATIS</span>
                                    : <span className="gi-offer">S/. {steamdata.oprice}</span>
                                    }
                                    
                                </div>
                            </div>
                        </a>
                        
                    ))}

                    <div className="g-hook">
                        <a href="/offers">Ver más ofertas...</a>
                    </div>
                    
                </div>



                <div className="sub-division2">
                    <img src={epiclogo} alt="" />
                    <h2>EPIC GAMES</h2>
                </div>
                <div className="game-content">
                    {epicdata
                    .filter(epicdata => epicdata.nprice !== epicdata.oprice)
                    .reverse()
                    .slice(0,24)
                    .map(epicdata =>(
                        <a href={epicdata.link} className={"g-index "+epicdata.id} key={epicdata.id}>
                            <div className="game-index-offer">
                                    {epicdata.oprice <= 0 ? "GRATIS"
                                    :
                                    <span className="gi-offer">-{Math.round(((epicdata.nprice-epicdata.oprice)/epicdata.nprice)*100.0)}%</span>}
                                
                            </div>
                            <img className="game-index-img-epic" src={epicdata.img} alt="" />
                            <div className="game-index-info">
                                <div className="game-index-name">
                                    <h3>{epicdata.name}</h3>
                                </div>
                                <div className="game-index-price">
                                    <span className="gi-normal">S/. {epicdata.nprice}</span>
                                    {epicdata.oprice <= 0 ? <span className="gi-offer">GRATIS</span>
                                    :
                                    <span className="gi-offer">S/. {epicdata.oprice}</span>}
                                    
                                </div>
                            </div>
                        </a>
                    ))}

                    <div className="g-hook">
                        <a href="/offers">Ver más ofertas...</a>
                    </div>
                </div>
            </div>
        </div>
    )
}