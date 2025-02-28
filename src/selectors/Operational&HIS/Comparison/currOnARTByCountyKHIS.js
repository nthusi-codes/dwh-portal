import { createSelector } from 'reselect';

const listUnfiltered = state => state.currOnArtKHISByCounty.listUnfiltered;
const listFiltered = state => state.currOnArtKHISByCounty.listFiltered;
const filtered = state => state.filters.filtered;

const listUnfilteredDWH = state => state.currentOnArtByCounty.listUnfiltered;
const listFilteredDWH = state => state.currentOnArtByCounty.listFiltered;


export const getCurrentOnARTByCountyKHIS = createSelector(
    [listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH],
    (listUnfiltered, listFiltered, filtered, listUnfilteredDWH, listFilteredDWH) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const listDWH = filtered ? listFilteredDWH : listUnfilteredDWH;

//KHIS
        const labels = list.map((item) => item.County ? item.County.toUpperCase() : 'UNKNOWN');
        const data = list.map(item => item.OnART);
//DWH
        const dataDwh = labels.map(item => {
            let number = 0;
            listDWH.map(itemDWH => {
                if (item === itemDWH.County) {
                    number = itemDWH.txCurr;
                }
            })
            return number;
        });



        return {
            data, labels, dataDwh
        };
    }
);
