import { useState, useEffect } from 'react';
import axios from 'axios';
import { WorldCloud, BarChart, Menu } from '../../components'
const SearchAuthor = () => {
    const [loading, setLoading] = useState(false);
    const [artist, setArtist] = useState('');
    const [staticArtist, setStaticArtist] = useState('');
    const [dataCloud, setDataCloud] = useState({});
    const [dataBar, setDataBar] = useState([]);
    const handleChange = (event) => {
        setArtist(event.target.value);
    }
    const handleSubmit = async () => {
        setLoading(true);
        setDataBar([]);
        setDataCloud({});
        if(artist === ""){
            alert("Artist name cannot be empty!")
        }else{
            const songs = (await search(artist)).data.lyrics;
            let count = {}
            let cloudData = []
            
                for (const element of songs.join(' ').split(' ')) {
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
            
            setDataCloud(cloudData);
            setDataBar(count);
            setStaticArtist(artist);
            setLoading(false);
        }
    }
    return (
        <div>
        <Menu />
            <div className='searchform'>
                <input type={'text'} placeholder={"Enter artist name"} onChange={handleChange}/>
                <button type={'button'} onClick={handleSubmit}>Search</button>
            </div>
            <div className='graphs'>
                {
                    Object.keys(dataBar).length > 1 ?
                    <div>
                        <AuthorGraphs author={staticArtist} cloudData={dataCloud} barData={dataBar}/>
                    </div> :
                        loading ? 
                        <center><img src='https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif' ></img> <h1>This can take up to 1 minute, thanks for your patience!</h1></center>
                        :
                        <h1>No songs found!</h1>
                }
                
            </div>
        </div>
    );
};


const search = async (artist) => {
    console.log("Buscando")
    const body= {
        author: artist
    }
    let response;
    await axios.post(process.env.REACT_APP_API_LINK+"songs_by_author", body).then((res)=>{
        response = res;
    }).catch((err)=>{
        response = err;
    })
    return response
}
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
    
export { SearchAuthor };
