import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as twentyFourMonthRetentionSelectors from '../../../selectors/CT/TreatmentOutcomes/twentyFourMonthRetention';

const TwentyFourMonthRetention = () => {
    const [twentyFourMonthRetention, setTwentyFourMonthRetention] = useState({});
    const twentyFourMonthRetentionData = useSelector(twentyFourMonthRetentionSelectors.getTwentyFourMonthRetention);

    const loadTwentyFourMonthRetention = useCallback(async () => {
        setTwentyFourMonthRetention({
            title: { text: '' },
            xAxis: [{ categories: twentyFourMonthRetentionData.yearCategories, title: { text: 'Year of start from 2011' }, crosshair: true }],
            yAxis: [{ title: { text: 'Number of Patients' }}],
            plotOptions: { column: { dataLabels: { enabled: true, crop: false, overflow: 'none' } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number of Patients', data: twentyFourMonthRetentionData.data, type: 'column', color: "#485969" },
            ]
        });
    }, [twentyFourMonthRetentionData]);

    useEffect(() => {
        loadTwentyFourMonthRetention();
    }, [loadTwentyFourMonthRetention]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        24 MONTH RETENTION BY YEAR OF ART START
                    </CardHeader>
                    <CardBody className="trends-body">
                        <div className="col-12">
                            <HighchartsReact highcharts={Highcharts} options={twentyFourMonthRetention} />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default TwentyFourMonthRetention;
