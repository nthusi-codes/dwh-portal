import React, { useState } from 'react';
import CTFilter from '../../Shared/CTFilter';
import NewOnArtHeader from './NewOnArtHeader';
import NewOnArtFooter from './NewOnArtFooter';
import NewOnArtTrends from './NewOnArtTrends';
import NewOnArtByAgeSex from './NewOnArtByAgeSex';
import MedianTimeToArtStart from './MedianTimeToArtStart';
import MedianTimeToArtStartByCounty from './MedianTimeToArtStartByCounty';
import MedianTimeToArtStartByPartner from './MedianTimeToArtStartByPartner';
import TimeFromDiagnosisToStart from './TimeFromDiagnosisToStart';
import FacilitiesNewOnArtList from './FacilitiesNewOnArtList';

const NewOnArt = () => {
    const [globalFilter, setGlobalFilter] = useState({
        county: [],
        subCounty: [],
        facility: [],
        partner: [],
        year:`${new Date().getFullYear()}`,
        month: ''
    });

    const updateGlobalFilter = (selection) => {
        setGlobalFilter(selection);
    };

    return (
        <div className="animated fadeIn">
            <div className="strip"></div>
            <NewOnArtHeader></NewOnArtHeader>
            <CTFilter onFilterChange={updateGlobalFilter} />
            <p></p><NewOnArtTrends globalFilter={globalFilter}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p>
            <div className="row">
                <div className="col-6">
                    
                </div>
                <div className="col-6">
                    <NewOnArtByAgeSex globalFilter={globalFilter}/>
                </div>
            </div>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStart/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStartByCounty/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><MedianTimeToArtStartByPartner/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            <p></p><TimeFromDiagnosisToStart globalFilter={globalFilter}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p>
            {/* <p></p><FacilitiesNewOnArtList globalFilter={globalFilter}/>
            <hr/><NewOnArtFooter/><hr/><div className="strip"></div><p></p> */}
        </div>
    );

};

export default NewOnArt;
