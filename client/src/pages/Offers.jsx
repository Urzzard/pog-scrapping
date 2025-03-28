import { useEffect, useState } from "react";
import { getAllSteamData } from "../api/steam-dg-api";
import { getAllEpicData } from "../api/epic-dg-api";
import { useNavigate} from "react-router-dom";
import { toast } from "react-hot-toast";
import steamlogo from '../assets/otros/steam-logo.png'
import epiclogo from '../assets/otros/epic.png'

export function Offers(){

    const [steamdata, setSteamdata] = useState([]);
    const [epicdata, setEpicdata] = useState([]);
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState([0,100])
    const [sortOrder, setSortOrder] = useState("A-Z");
    const [showSteam, setShowSteam] = useState(true);
    const [showEpic, setShowEpic] = useState(true);
    const [filteredSteamData, setfilteredSteamData] = useState([]);
    const [filteredEpicData, setfilteredEpicData] = useState([]);
    
    const [loadSteamCount, setloadloadSteamCount] = useState(15);
    const [loadEpicCount, setloadloadEpicCount] = useState(15);

    useEffect(() =>{
        async function loadSteamData() {
            const res = await getAllSteamData();
            setSteamdata(res.data)
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

    useEffect(() => {
        let steamFiltered = steamdata
        .filter(game => game.name.toLowerCase().includes(search.toLowerCase()))
        .filter(game => game.oprice >= priceRange[0] && game.oprice <= priceRange[1])

        steamFiltered.sort((a,b) => {
            return sortOrder ==="A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        })

        let epicFiltered = epicdata
        .filter(game => game.name.toLowerCase().includes(search.toLowerCase()))
        .filter(game => game.oprice >= priceRange[0] && game.oprice <= priceRange[1])

        epicFiltered.sort((a,b) => {
            return sortOrder ==="A-Z" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        })

        setfilteredSteamData(steamFiltered);
        setfilteredEpicData(epicFiltered);

    }, [steamdata, epicdata, search, priceRange, sortOrder]);

    const loadMoreSteam = () => {
        setloadloadSteamCount(prevCount => prevCount + 15);
    };

    const loadMoreEpic = () =>{
        setloadloadEpicCount(prevCount => prevCount + 15)
    }

    return(
        <div className="offers">
            <div className="tittle">
                <h2>SEARCH YOUR OFFERS..!</h2>
            </div>
            <div className="main-box">
                <div className="off-filter">
                    <h3>- FILTROS -</h3>
                    <div className="off-all-filters">
                        <div className="fl-search">
                            <span for="buscar">Buscar:</span>
                            <div class="relative">
                                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input name="buscar" id="buscar" type="text" placeholder="Search" class="block w-full p-2 ps-10 text-sm text-gray-900 border  rounded-lg  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            </div>
                            
                            
                        </div>
                        <div className="fl-order">
                            <span for="order">Orden:</span>
                            <select name="oder" id="order" class="block w-full p-2 text-sm text-gray-900 border  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={sortOrder} onChange={(e) =>setSortOrder(e.target.value)}>
                                <option value="A-Z">A - Z</option>
                                <option value="Z-A">Z - A</option>
                            </select>
                        </div>
                        <div className="fl-platform">
                            <span>Plataformas:</span>
                            <div className="p-epic">
                                <input type="checkbox" name="epic" id="" class="w-4 h-4" checked={showEpic} onChange={() => setShowEpic(!showEpic)} />
                                <span>Epic</span>
                            </div>
                            <div className="p-steam">
                                <input type="checkbox" name="steam" id="" class="w-4 h-4" checked={showSteam} onChange={() => setShowSteam(!showSteam)} />
                                <span>Steam</span>
                            </div>
                        </div>
                        <div className="fl-price">
                            <span>Precio:</span>
                            <input type="range" name="precio" id="precio" min="0" max="100" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" value={priceRange[1]} onChange={(e) =>setPriceRange([0, Number(e.target.value)])}/>
                            <span>{priceRange[1]}</span>
                        </div>
                    </div>
                    
                </div>
                <div className="off-content">
                    {showSteam && (
                        <div className="off-content-box">
                        {filteredSteamData.slice(0, loadSteamCount).map((steamdata, index) =>(
                                <a href={steamdata.link} className={"g-index "+steamdata.id} key={index}>
                                    {steamdata.nprice !== steamdata.oprice ?
                                        <div className="game-index-offer">
                                            -{Math.round(((steamdata.nprice-steamdata.oprice)/steamdata.nprice)*100.0)}%
                                        </div>
                                        :
                                        <div></div>
                                    }
                                    
                                    <img className="game-index-steam-logo" src={steamlogo} alt="" />
                                    <img className="game-index-img-steam" src={steamdata.img} alt="" />
                                    <div className="game-index-info">
                                        <div className="game-index-name">
                                            <h3>{steamdata.name}</h3>
                                        </div>
                                        {steamdata.nprice !== steamdata.oprice ?
                                            <div className="game-index-price">
                                                <span className="gi-normal">S/. {steamdata.nprice}</span>
                                                <span className="gi-offer">S/. {steamdata.oprice}</span>
                                            </div>
                                        :
                                            <div className="game-index-price">
                                                <span className="gi-offer">S/. {steamdata.oprice}</span>
                                            </div>
                                        }
                                        
                                    </div>
                                </a>
                            ))}

                            {loadSteamCount < filteredSteamData.length && (
                                <button onClick={loadMoreSteam}>Cargar mas resultados de Steam</button>
                            )}
                        </div>

                    )}
                    
                    {showEpic && (
                        <div className="off-content-box">
                        {filteredEpicData.slice(0, loadEpicCount).map(epicdata =>(
                            <a href={epicdata.link} className={"g-index "+epicdata.id} key={epicdata.id}>
                                {epicdata.nprice !== epicdata.oprice ?
                                    <div className="game-index-offer">
                                        -{Math.round(((epicdata.nprice-epicdata.oprice)/epicdata.nprice)*100.0)}%
                                    </div>
                                    : epicdata.oprice <= 0 ?
                                    <div className="game-index-offer">GRATIS</div>
                                    :
                                    <div></div>
                                }
                                
                                <img className="game-index-steam-logo" src={epiclogo} alt="" />
                                <img className="game-index-img-epic" src={epicdata.img} alt="" />
                                <div className="game-index-info">
                                    <div className="game-index-name">
                                        <h3>{epicdata.name}</h3>
                                    </div>
                                    {epicdata.nprice !== epicdata.oprice ?
                                        <div className="game-index-price">
                                            <span className="gi-normal">S/. {epicdata.nprice}</span>
                                            <span className="gi-offer">S/. {epicdata.oprice}</span>
                                        </div>
                                        :
                                        <div className="game-index-price">
                                            {epicdata.oprice <= 0 ? <span className="gi-offer">GRATIS</span>
                                            :
                                            <span className="gi-offer">S/. {epicdata.oprice}</span>
                                            }
                                        </div>
                                    }
                                    
                                </div>
                            </a>
                        ))}
                        {loadEpicCount < filteredEpicData.length && (
                            <button onClick={loadMoreEpic}>Cargar más resultados de Epic</button>
                        )}
                        </div>
                    )}
                    
                </div>
                
            </div>
            
        </div>
    )
}