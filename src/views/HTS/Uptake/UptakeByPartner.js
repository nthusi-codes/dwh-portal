import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAll } from '../../Shared/Api';
import moment from "moment";

const UptakeByPartner = () => {
    const filters = useSelector(state => state.filters);
    const [uptakeByPartner, setUptakeByPartner] = useState({});

    const loadUptakeByPartner = useCallback(async () => {
        let params = {
            county: filters.counties,
            subCounty: filters.subCounties,
            partner: filters.partners,
            agency: filters.agencies,
            year: filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("YYYY"):moment().format("YYYY")
        };
        params.month = filters.fromDate ? moment(filters.fromDate, "MMM YYYY").format("MM") : '';
        const partners = [];
        let tested = [];
        let positivity = [];
        const result = await getAll('hts/uptakeByPartner', params);
        for(let i = 0; i < result.length; i++) {
            partners.push(result[i].Partner);
            tested.push(parseInt(result[i].Tested, 10));
            const val = parseFloat(parseFloat(result[i].positivity).toFixed(1));
            positivity.push(val);
        }
        setUptakeByPartner({
            title: { text: '', },
            xAxis: [{ categories: partners, title: { text: 'Partners' }, crosshair: true }],
            yAxis: [
                { title: { text: 'Number Tested' } },
                { title: { text: 'HIV Positivity'}, opposite: true, labels: { format: '{value} %' } },
            ],
            tooltip: { shared: true },
            plotOptions: { column: { dataLabels: { enabled: true } } },
            legend: { align: 'left', verticalAlign: 'top', y: 0, x: 80 },
            series: [
                { name: 'Number Tested', type: 'column', data: tested, yAxis: 0, color: "#1AB394" },
                { name: 'HIV Positivity', type: 'spline', data: positivity, yAxis: 1, color: "#E06F07", tooltip: { valueSuffix: ' %' } }
            ],
        });
    }, [filters]);

    useEffect(() => {
        loadUptakeByPartner();
    }, [loadUptakeByPartner]);

    return (
        <div className="row">
            <div className="col-12">
                <Card className="trends-card">
                    <CardHeader className="trends-header">
                        HIV TESTING SERVICES UPTAKE BY PARTNER
                    </CardHeader>
                    <CardBody className="trends-body">
                        <HighchartsReact highcharts={Highcharts} options={uptakeByPartner} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default UptakeByPartner;
