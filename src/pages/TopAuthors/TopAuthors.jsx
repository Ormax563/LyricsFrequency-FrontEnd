import { useState, useEffect } from 'react';
import axios from 'axios';
import { WorldCloud, BarChart, Menu } from '../../components'
const TopAuthors = () => {
    const [dataCloud , setDataCloud] = useState([]);
    const [dataBar, setDataBar] = useState([]);
    const [authors, setAuthors] = useState([]); 
    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_LINK+"top_authors").then((res)=>{
            let count = {}
            let cloudData = []
            const songs = Object.values(res.data);
            
            const authors = Object.keys(res.data);
            let lyricsCloud =[]
            let lyricsBar = []
            for (const song of songs) {
                for (const element of song.join(' ').split(' ')) {
                    if (count[element]) {
                      count[element] += 1;
                    } else {
                      count[element] = 1;
                    }
                }
                
                for (const word of Object.keys(count)){
                    cloudData.push({
                        "text": word,
                        "value": count[word]*20
                    })
                }
                lyricsCloud.push(cloudData)
                lyricsBar.push(count)
                count = {}
                cloudData =[]
            }
            
            setDataCloud(lyricsCloud)
            setDataBar(lyricsBar)
            setAuthors(authors)

        }).catch((err)=>{
            console.log('ERROR FROM API => ', err)
        })
    },[])
    return (
        <div>
        <Menu />
            {dataCloud.length > 0 ? 
                <div className='graphs'>
                    {
                       
                        dataCloud.map((item, idx) =>
                            {
                                return (
                                    <div>
                                        
                                        <AuthorGraphs author={authors[idx]} key={idx} cloudData={item} barData={dataBar[idx]}/>
                                    </div>
                                )    
                            }
                            
                        )
                    }
                     
                </div>
                : <center><img src='https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif' ></img> <h1>This can take up to 1 minute, thanks for your patience!</h1></center>
                
            }
            
        </div>
    );
};

const AuthorGraphs = (props) => (
    <div className="author">
        <h2>{props.author}</h2>
        <div className="charts">
            <div className="chart">
                <WorldCloud data={props.cloudData} />
            </div>
            <div className="chart">
                <BarChart labels={Object.keys(props.barData)} values={Object.values(props.barData)} />
            </div>
        </div>
        <hr></hr>
    </div>
)
    
export { TopAuthors };
