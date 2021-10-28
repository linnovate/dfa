import React from 'react';
import { Segment } from 'semantic-ui-react';

const Graph: React.FC<Props> = ({ imgSrc }) => {

    return (
        <Segment>
           <img className="graph-img" src={imgSrc} />
        </Segment>
    );
};

export default Graph;
