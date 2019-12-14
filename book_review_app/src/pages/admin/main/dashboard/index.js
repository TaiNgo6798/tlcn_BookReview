import React, { useState, useEffect } from 'react'
import { Calendar, Select, Radio, Col, Row, Statistic, Icon } from 'antd'
import Chart from 'chart.js'
import './index.scss'

const { Group, Button } = Radio

function Index() {

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  }

  const chartRef = React.createRef();
  useEffect(() => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
          data: [3, 7, 12, 9],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              fontSize: 18
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 18
            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          titleFontSize: 20,
          bodyFontSize: 20
        }
      }
    })
  }, [])

  return (
    <>
      <div className='content_dashboard'>
        <div className='static_dashboard'>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Tổng số bài đăng" value={1128} prefix={<Icon type="book" />} />
            </Col>
          </Row>
        </div>
        <div className='bottom_dashboard'>
          <Row gutter={8}>
            <Col className="gutter-row" xs={24} sm={24} md={24} lg={16} xl={16}>
              <div className='chart_dashboard'>
                <canvas id="myChart" className='content_chart'>
                </canvas>
                <h3><i>Số bài đăng 4 tháng gần đây</i></h3>
              </div>
            </Col>
            {/* <Col className="gutter-row" xs={8} sm={12} md={18} lg={24} xl={12}>
              <div className='calendar_dashboard'>
                <Calendar
                  fullscreen={false}
                  headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];

                    const current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                      current.month(i);
                      months.push(localeData.monthsShort(current));
                    }

                    for (let index = start; index < end; index++) {
                      monthOptions.push(
                        <Select.Option className="month-item" key={`${index}`}>
                          {months[index]}
                        </Select.Option>,
                      );
                    }
                    const month = value.month();

                    const year = value.year();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                      options.push(
                        <Select.Option key={i} value={i} className="year-item">
                          {i}
                        </Select.Option>,
                      );
                    }
                    return (
                      <div style={{ padding: 10 }}>
                        <div style={{ marginBottom: '10px' }}>Lịch </div>
                        <Row type="flex" justify="space-between">
                          <Col>
                            <Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                              <Button value="month">Month</Button>
                              <Button value="year">Year</Button>
                            </Group>
                          </Col>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              className="my-year-select"
                              onChange={newYear => {
                                const now = value.clone().year(newYear);
                                onChange(now);
                              }}
                              value={String(year)}
                            >
                              {options}
                            </Select>
                          </Col>
                          <Col>
                            <Select
                              size="small"
                              dropdownMatchSelectWidth={false}
                              value={String(month)}
                              onChange={selectedMonth => {
                                const newValue = value.clone();
                                newValue.month(parseInt(selectedMonth, 10));
                                onChange(newValue);
                              }}
                            >
                              {monthOptions}
                            </Select>
                          </Col>
                        </Row>
                      </div>
                    );
                  }}
                  onPanelChange={onPanelChange}
                />
              </div>
            </Col> */}
          </Row>
        </div>
      </div>
    </>
  )
}

export default Index