import { Card, CardBody, CardHeader } from 'reactstrap';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as otzVlSuppressionByAgeSelector from '../../../selectors/CT/OTZ/otzVlSuppressionByAge';

const OtzVlSuppressionByAge = () => {
    const [otzVlSuppressionByAge, setOtzVlSuppressionByAge] = useState({});
    const vlSuppressionAge = useSelector(otzVlSuppressionByAgeSelector.getOtzVlSuppressionByAge);

    const loadVlSuppressionByAge = useCallback(async () => {
        setOtzVlSuppressionByAge({
            title: { text: '' },
            plotOptions: { column: { stacking: 'percent' } },
            xAxis: [{ categories: vlSuppressionAge.ageGroups, crosshair: true }],
            yAxis: [{ title: { text: 'Percentage of Patients' }}],
            tooltip: { shared: true },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'HVL', data: vlSuppressionAge.data[0], type: 'column', color: "#E15759", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'LLV', data: vlSuppressionAge.data[1], type: 'column', color: "#F28E2B", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
                { name: 'VS', data: vlSuppressionAge.data[2], type: 'column', color: "#3475B3", tooltip: { valueSuffix: ' ({point.percentage:.0f}%)' } },
            ]
        });
    }, [vlSuppressionAge]);

    useEffect(() => {
        loadVlSuppressionByAge();
    }, [loadVlSuppressionByAge]);

    return (
        <Card className="trends-card">
            <CardHeader className="trends-header" style={{textTransform: 'none'}}>
                VL SUPPRESSION AMONG ALHIV ENROLLED IN OTZ BY AGE
            </CardHeader>
            <CardBody className="trends-body">
                <div className="col-12">
                    <HighchartsReact highcharts={Highcharts} options={otzVlSuppressionByAge} />
                </div>
            </CardBody>
        </Card>
    );
};

export default OtzVlSuppressionByAge;
