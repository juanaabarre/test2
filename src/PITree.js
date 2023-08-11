import React, {Component} from 'react';
import {Card, CardBody, CardFooter, Button, Row, Col, CardHeader, Form, FormGroup, Input} from 'reactstrap';
import {tree} from './categorized.js';
import Tree from 'react-d3-tree';
import downloadSvg, {downloadPng} from "svg-crowbar";

class PITree extends Component {
    constructor(props) {
        super(props);
        let thisMonth = new Date();
        thisMonth.setMonth(thisMonth.getMonth() - 1);
        thisMonth = thisMonth.toISOString().split("T")[0].slice(0, 7);
        this.state = {
            thisMonth,
            treeData: tree,
        };
    }

    //Custom function to return formated tree nodes. It's used to colour code nodes accourding to value.
    renderSvgNode = ({nodeDatum, toggleNode}) => {
        let colour = 'rgba(153,102,255,0.8)';
        let testedValue = nodeDatum.attributes?.value;

        if (testedValue <= 1) {
            colour = 'rgba(233,30,99,0.8)';
        } else if (testedValue <= 2) {
            colour = 'rgba(255,159,64,0.8)';
        } else if (testedValue <= 3) {
            colour = 'rgba(255,230,0,0.8)';
        } else if (testedValue <= 4) {
            colour = 'rgba(34,182,110,0.8)';
        } else if (testedValue <= 5) {
            colour = 'rgba(68,159,238,0.8)';
        }
        if (testedValue === null) {
            colour = 'rgba(153,102,255,0.8)';
        }

        return (
            <g>
                <circle fill={colour} r="20" onClick={toggleNode}/>
                <text fill="black" strokeWidth="1" x="30">
                    {nodeDatum.name}
                </text>
                {(nodeDatum.attributes?.value || nodeDatum.attributes?.value === 0) ? (
                    <text fill="gray" stroke="gray" x="30" dy="20" strokeWidth="1">
                        <tspan x="30" dy="20">Value: {nodeDatum.attributes?.value}</tspan>
                        {nodeDatum.attributes?.weight ?
                        <tspan x="30" dy="20">Weight: {nodeDatum.attributes?.weight}</tspan> : null}
                    </text>
                ) : (
                    <text fill="gray" stroke="gray" x="30" dy="20" strokeWidth="1">
                        Value: no data!
                    </text>
                )}
            </g>
        )
    };

    render() {
        return (
            <div>
                <Row style={{height: '100vh'}}>
                    <Col md={11} className='m-a-auto'>
                        <Card style={{height: '100%'}}>
                            <CardHeader>
                                <Form>
                                    <FormGroup className='p-t-md'>
                                        <Input type="month" name="date" id="endDate"
                                               max={this.state.thisMonth.toString()}
                                               placeholder="20yy-MM"
                                               defaultValue={this.state.thisMonth.toString()}
                                               pattern="20[0-9]{2}-[0-1][0-9]"/>
                                    </FormGroup>
                                    <FormGroup className='p-t-md'>
                                        <Button color='primary' outline>
                                            <i className='fa fa-search'/>
                                            Search
                                        </Button>
                                        <Button color='info' outline onClick={e => {
                                            e.preventDefault();
                                            let svg = document.querySelector('.rd3t-svg').cloneNode(true);
                                            //this is where i'm having trouble.
                                            downloadPng(svg, 'PITree', {css: 'internal'});
                                            //this works as expected
                                            downloadSvg(svg, 'PITree', {css: 'internal'});
                                        }}>
                                            <i className='fa fa-save'/>
                                            &nbsp;Save
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </CardHeader>
                            <CardBody className='capture-node'>
                                {this.state.treeData ?
                                    (<Tree data={this.state.treeData} translate={{x: '12', y: '70'}} zoom='0.3'
                                                              initialDepth='2'
                                                              //separation={{nonSiblings: 2, siblings:3.5}} orientation='vertical'
                                                              separation={{nonSiblings: 1, siblings:0.5}}
                                                              depthFactor='400'
                                                              enableLegacyTransitions={true}
                                                              renderCustomNodeElement={this.renderSvgNode}/>)
                                    : (<p className='m-a-auto p-a-xxl'>Nothing to see here yet.</p>)
                                }
                            </CardBody>
                            <CardFooter />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PITree;
