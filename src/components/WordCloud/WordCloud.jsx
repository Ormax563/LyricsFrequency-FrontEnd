import React from "react";
import WordCloud from "react-d3-cloud";



const Cloud = ({ data }) => {

    return <WordCloud
                width={100}
                height={50}
                data={data}
                fontSize={(word) => word.value / 20}
                rotate={0}
                padding={0}
            />;
};

export {
  Cloud as WorldCloud
};