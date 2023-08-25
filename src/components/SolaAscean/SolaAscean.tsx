import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import AsceanStatCompiler from '../../components/AsceanStatCompiler/AsceanStatCompiler'
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler'
import Delete from '../AsceanBuilder/Delete';
import Update from '../AsceanBuilder/Update';
import Save from '../AsceanBuilder/Save';
import { AsceanModal } from '../AsceanBuilder/AsceanModal';

interface Props {
    ascean: any;
    userProfile?: boolean;
    deleteAscean?: any;
    loggedUser?: any;
    loading?: boolean;
    accordion?: string;
    handleAsceanCreate?: any;
};

export const Symbols = {
    space: <svg height="5" width="100%" className="tapered-rule mt-2">
                <polyline points="0,0 550,2.5 0,5"></polyline>
            </svg>,
    play: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 479.276 479.276">
            <path d="M394.053,365.606l-17.806-28.036l17.278-19.482c1.297-1.463,1.721-3.504,1.112-5.362s-2.158-3.253-4.069-3.664  l-90.554-19.486l30.577-6.753c0.822-0.181,1.605-0.535,2.277-1.077c1.292-1.044,2.044-2.617,2.044-4.279v-54.117  c0-2.592-1.809-4.832-4.343-5.377l-48.174-10.366V165.75h7.132c9.997,0,18.13-8.133,18.13-18.13s-8.133-18.13-18.13-18.13h-21.765  V29.428c6.737-1.416,11.813-7.402,11.813-14.554C279.574,6.672,272.902,0,264.7,0h-50.126C206.373,0,199.7,6.672,199.7,14.874  c0,7.152,5.075,13.138,11.813,14.554v100.061h-21.765c-9.997,0-18.13,8.133-18.13,18.13s8.133,18.13,18.13,18.13h7.127v23.454  L91.023,166.426c-2.167-0.468-4.403,0.414-5.67,2.233c-1.267,1.819-1.318,4.221-0.129,6.092l17.806,28.036l-17.278,19.483  c-1.297,1.463-1.721,3.504-1.112,5.362s2.158,3.253,4.069,3.664l90.554,19.486l-30.582,6.742c-0.821,0.181-1.601,0.546-2.272,1.088  c-1.292,1.044-2.044,2.617-2.044,4.279v54.117c0,2.592,1.809,4.832,4.343,5.377l48.167,10.365v84.676  c0,1.079,0.317,2.134,0.912,3.034l37.26,56.35c1.019,1.54,2.742,2.466,4.588,2.466s3.569-0.926,4.588-2.466l37.26-56.35  c0.595-0.9,0.912-1.955,0.912-3.034v-66.274l105.858,22.779c0.386,0.083,0.773,0.124,1.158,0.124c1.774,0,3.471-0.861,4.512-2.357  C395.191,369.879,395.242,367.478,394.053,365.606z M196.871,267.38l-21.157-4.553l21.157-4.658V267.38z M207.871,256.939  l26.264,5.652v12.809l-26.264-5.652V256.939z M245.135,264.957l26.256,5.65v12.809l-26.256-5.65V264.957z M282.391,272.974  l21.171,4.556l-21.171,4.664V272.974z M271.395,205.239l-26.26-5.651V165.75h26.26V205.239z M256.762,85.118h-34.249V74.119h34.249  V85.118z M256.762,63.119h-34.249V52.12h34.249V63.119z M256.762,41.12h-34.249V29.748h34.249V41.12z M222.513,96.118h34.249v10.999  h-34.249V96.118z M214.574,11H264.7c2.136,0,3.874,1.738,3.874,3.874s-1.738,3.874-3.874,3.874h-2.438h-45.249h-2.438  c-2.136,0-3.874-1.738-3.874-3.874S212.438,11,214.574,11z M222.513,118.117h34.249v11.372h-34.249V118.117z M182.618,147.62  c0-3.932,3.198-7.13,7.13-7.13h99.779c3.932,0,7.13,3.199,7.13,7.13s-3.199,7.13-7.13,7.13h-99.779  C185.816,154.75,182.618,151.551,182.618,147.62z M207.875,165.75h26.26v31.472l-26.26-5.651V165.75z M114.009,206.986  c1.628-1.835,1.843-4.527,0.528-6.598l-12.985-20.445l222.36,47.848v42.865l-223.683-48.133L114.009,206.986z M207.875,335.117  l26.26,5.651v114.719l-26.26-39.714V335.117z M271.395,415.772l-26.26,39.714V343.135l26.26,5.651V415.772z M155.365,312.566  v-42.865l223.682,48.133l-13.779,15.537c-1.628,1.835-1.843,4.527-0.528,6.598l12.985,20.445L155.365,312.566z"></path>
        </svg>,
    phaser: <svg xmlns="http://www.w3.org/2000/svg"  width="28" height="28" fill="currentColor" viewBox="0 0 1000 1000">
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6619.3,4995c-12.4-8.2-37.1-65.9-53.5-127.7c-16.5-61.8-37.1-111.2-47.4-109.1c-420.1,80.3-747.5,90.6-883.4,28.8c-109.1-49.4-142.1-90.6-185.3-236.8c-74.1-238.9-271.8-471.5-492.1-578.6c-300.6-144.1-617.7-156.5-1165.5-43.2c-436.5,90.6-803.1,127.7-978.1,98.8l-123.5-20.6l164.7-2.1c255.3-6.2,455.1-49.4,776.3-173c325.3-125.6,570.4-199.7,661-199.7c115.3,0,30.9-37.1-115.3-51.5c-187.4-18.5-374.8,10.3-716.6,105c-152.4,41.2-345.9,78.2-463.3,88.5c-205.9,18.5-267.7,14.4-160.6-8.2c187.4-41.2,442.7-123.5,615.7-197.7c304.7-129.7,527.1-168.8,947.2-168.8c796.9,2,1079,173,1120.2,683.6c8.2,96.8,26.8,197.7,39.1,220.3c59.7,113.3,317.1,117.4,628,12.4c100.9-32.9,185.3-65.9,189.4-70c8.2-8.2-947.2-3183.4-961.6-3197.8c-4.1-6.2-133.8,41.2-288.3,105c-220.3,90.6-284.2,125.6-302.7,166.8c-14.4,28.8-20.6,53.5-18.5,55.6c4.1,2.1,45.3,22.7,94.7,43.2c177.1,76.2,313,275.9,313,455.1c0,55.6-4.1,57.7-298.6,103c-123.6,18.5-232.7,41.2-243,47.4c-8.2,8.2,59.7,70,150.3,135.9c90.6,67.9,162.7,131.8,158.6,144.1c-2.1,10.3-68,51.5-144.1,90.6c-121.5,61.8-160.6,70-288.3,70c-551.9,0-766-566.3-352.1-930.7c53.5-47.4,105-84.4,115.3-84.4c28.8,0-2.1-133.8-111.2-471.5c-80.3-247.1-100.9-333.6-90.6-395.4c14.4-86.5,12.4-88.5-164.7-111.2l-103-12.4l26.8-220.3c74.1-591,348-1142.8,722.7-1455.8c193.6-162.7,500.4-310.9,745.4-360.4c313-63.8,337.7-61.8,492.1,76.2c107.1,96.8,127.7,107.1,115.3,65.9c-26.8-92.7-152.4-348-224.5-457.1c-88.5-133.8-257.4-306.8-282.1-290.3c-10.3,6.2-18.5,51.5-18.5,100.9c0,100.9-74.1,360.4-103,360.4c-10.3,0-24.7-35-30.9-78.2c-22.7-131.8-32.9-152.4-131.8-257.4c-84.4-92.7-313-261.5-354.2-261.5c-16.5,0-18.5,12.4-59.7,253.3c-14.4,76.2-30.9,138-39.1,138s-30.9-30.9-49.4-70c-18.5-39.1-80.3-109.1-140-156.5c-121.5-94.7-385-257.4-399.5-243c-4.1,4.1,14.4,67.9,45.3,140c123.5,306.8,111.2,539.5-37.1,784.5c-142.1,236.8-173,426.2-113.3,683.6l26.8,117.4l-94.7-53.5c-665.1-385-838.1-976-516.8-1770.8c24.7-59.7,16.5-80.3-234.7-539.5c-142.1-263.6-259.5-483.9-259.5-490.1s131.8-230.6,290.3-496.3l290.3-483.9l-12.4-142.1l-14.4-142.1h288.3c160.6,0,290.3,6.2,290.3,12.3c0,6.2-39.1,78.3-86.5,158.6c-78.2,133.8-490.1,1011-490.1,1044c0,6.2,49.4,28.8,111.2,47.4c269.7,86.5,553.9,337.7,827.8,733.1c4.1,4.1,278,74.1,609.5,156.5c640.4,160.6,984.3,267.7,1334.3,416c333.6,142.1,683.6,341.8,825.7,473.6l53.6,49.4l407.7-84.4c224.5-45.3,413.9-86.5,418-90.6c4.1-6.2-47.4-90.6-115.3-191.5l-123.5-185.3l216.2-96.8c117.4-53.5,218.3-94.7,222.4-90.6c8.2,8.3,195.6,704.2,189.4,708.3c-2.1,2.1-189.4,113.3-415.9,245c-226.5,133.8-420.1,249.2-430.4,257.4c-8.2,10.3,12.4,59.7,49.4,113.3c90.6,131.8,195.6,368.6,224.5,500.4c39.1,185.3,14.4,654.8-37.1,710.4c-8.2,8.2-82.4-12.4-162.7-47.4c-284.2-121.5-467.4-152.4-873.1-154.4c-199.7,0-368.6,4.1-374.8,10.3c-4.1,6.2-16.5,59.7-24.7,121.5c-14.4,107.1-12.4,109.1,30.9,94.7c76.2-22.6,599.2-16.5,743.3,8.2c263.6,47.4,597.1,179.2,597.1,236.8c0,96.8-47.4,156.5-179.1,222.4c-255.3,125.6-434.5,358.3-444.8,574.5c-4.1,80.3,4.1,111.2,30.9,129.7c61.8,39.1,107.1-8.2,121.5-127.7c28.8-232.7,212.1-399.5,586.9-537.4c164.7-59.7,269.8-148.3,296.5-247.1c28.8-113.3,103-140,253.3-96.8c267.7,78.3,288.3,222.4,92.7,654.8c-78.2,175-80.3,185.3-59.7,298.6c47.4,255.3,18.5,383-154.4,658.9l-96.8,156.5l61.8,210l61.8,212.1l-140,22.7c-203.9,32.9-591,28.8-766-10.3c-457.1-100.9-842.2-440.6-1039.9-920.4c-78.2-183.3-162.7-471.5-181.2-611.6c-8.2-55.6-20.6-103-28.8-103s-47.4,59.7-84.4,133.8c-43.3,80.3-80.3,129.7-94.7,123.5c-14.4-4.1-26.8,4.1-26.8,18.5c0,16.5,55.6,308.9,121.5,652.8c67.9,343.9,222.4,1130.5,341.8,1748.2c119.4,617.7,230.6,1190.2,247.1,1274.6c22.6,113.3,24.7,158.6,8.3,179.2C6687.3,5015.6,6656.4,5017.6,6619.3,4995z M8180.1,1471.8c70-72.1,76.2-140,16.5-216.2c-86.5-109.1-286.2-43.2-286.2,94.7C7910.4,1517.1,8064.8,1585.1,8180.1,1471.8z M5929.5,436.1c205.9-630.1,100.9-1202.5-290.3-1579.3l-94.7-92.7l-158.6,35C4875.2-1089.7,4473.7-669.7,4309-74.6c-61.8,220.3-63.8,216.2,90.6,253.3c243,59.7,469.5,203.9,568.3,362.4c28.8,47.4,30.9,47.4,111.2,12.4c129.7-57.7,415.9-51.5,597.1,14.4c80.3,28.8,154.4,53.5,166.8,55.6C5855.4,623.5,5894.5,539,5929.5,436.1z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3596.5,2511.7c-127.7-57.7-263.6-208-306.8-335.6c-20.6-59.7-32.9-166.8-32.9-288.3c0-339.8-59.7-385-374.8-280c-59.7,18.5-45.3-94.7,22.7-205.9c88.6-135.9,205.9-210,339.8-208c203.9,4.1,366.5,117.4,420.1,296.5c12.4,39.1,28.8,156.5,37.1,257.4c14.4,193.6,41.2,265.6,109.1,288.3c24.7,6.2,45.3,39.1,55.6,78.2c18.5,90.6,59.7,164.7,133.8,251.2c53.5,61.8,59.7,78.2,37.1,105C3954.8,2571.4,3761.2,2589.9,3596.5,2511.7z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M1341.8-109.6c-28.8-4.1-119.4-28.8-201.8-51.5c-156.5-45.3-160.6-61.8-16.5-86.5c105-20.6,282.1-98.9,372.7-168.9c41.2-30.9,98.8-98.8,129.7-150.3c49.4-82.4,55.6-115.3,53.5-259.5c0-133.8-12.4-191.5-61.8-308.9c-51.5-125.6-59.7-168.8-59.7-339.7c0-175,8.2-210,65.9-331.5c129.7-278,315-411.8,593-426.3c243-12.3,459.2,70,737.2,280c88.5,68,96.8,82.4,96.8,160.6c0,80.3,28.8,263.6,53.5,341.8c8.2,28.8-4.1,28.8-119.4-8.2c-189.4-59.7-422.1-72.1-508.6-28.8c-109.1,57.6-135.9,148.3-105,366.5c35,245,18.5,473.6-43.2,603.3c-127.7,269.8-418,426.3-780.4,420.1C1463.3-99.3,1370.6-105.5,1341.8-109.6z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M8620.8-496.7c-10.3-4.1-148.3-37.1-302.7-72.1c-205.9-47.4-284.2-74.1-284.2-96.8c0-57.6-103-337.7-154.4-418c-28.8-45.3-51.5-86.5-51.5-92.7s49.4,14.4,109.1,43.3c57.7,30.9,191.5,94.7,294.5,142.1l189.4,88.5l98.8-88.5l100.9-88.5l-80.3-166.8c-45.3-90.6-74.1-173-65.9-181.2c8.2-8.2,105-74.1,214.1-144.1c148.3-94.7,203.9-119.4,214.2-100.9c39.1,72.1,78.2,284.2,78.2,434.5c0,152.4-6.2,181.2-82.4,337.7c-65.9,133.8-243,422.1-255.3,411.8C8641.4-488.5,8633.1-492.6,8620.8-496.7z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5037.9-2842.1c-181.2-49.4-352.1-94.7-380.9-100.9c-45.3-10.3-57.7-30.9-78.2-133.9c-24.7-121.5-140-380.9-238.9-535.4c-28.8-47.4-53.5-88.5-53.5-94.7c0-6.2,821.6-741.3,914.2-817.5c37.1-30.9,37.1-37.1,6.2-131.8c-20.6-55.6-35-107.1-35-117.4c0-8.2,115.3-16.5,255.3-16.5h257.4l-49.4,144.2c-47.4,135.9-70,166.8-444.8,570.4L4797-3647.2l57.7,41.2c123.5,84.4,313,294.4,383,422.1c65.9,115.3,160.6,364.5,160.6,415.9C5398.3-2745.3,5412.7-2743.2,5037.9-2842.1z"></path>
        </svg>,
    update: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512.001 512.001">
            <path d="M478.504,20.684c-5.346-5.346-11.841-8.831-19.135-10.832C458.508,4.272,453.699,0,447.883,0H181.161    c-0.131,0-0.259,0.015-0.39,0.02c-0.134,0.005-0.268,0.012-0.401,0.021c-0.489,0.033-0.972,0.087-1.442,0.179    c-0.015,0.003-0.03,0.003-0.045,0.007c-0.514,0.102-1.012,0.246-1.5,0.413c-0.091,0.031-0.18,0.065-0.27,0.099    c-0.458,0.17-0.905,0.363-1.333,0.586c-0.03,0.016-0.062,0.028-0.092,0.044c-0.452,0.241-0.881,0.518-1.294,0.815    c-0.095,0.069-0.19,0.14-0.284,0.212c-0.405,0.31-0.797,0.637-1.158,0.996c-0.006,0.006-0.013,0.01-0.019,0.016L23.988,152.354    c-0.006,0.006-0.012,0.014-0.017,0.02c-0.357,0.36-0.683,0.749-0.991,1.152c-0.074,0.097-0.148,0.193-0.219,0.292    c-0.294,0.411-0.568,0.837-0.808,1.285c-0.021,0.038-0.036,0.078-0.056,0.116c-0.219,0.419-0.406,0.855-0.573,1.302    c-0.036,0.098-0.073,0.195-0.108,0.294c-0.165,0.482-0.307,0.973-0.408,1.48c-0.006,0.029-0.008,0.059-0.014,0.09    c-0.087,0.455-0.141,0.92-0.173,1.393c-0.01,0.143-0.017,0.285-0.022,0.428c-0.003,0.126-0.019,0.249-0.019,0.377v339.782    c0,6.427,5.21,11.636,11.636,11.636h415.667c6.426,0,11.636-5.21,11.636-11.636V154.198l12.657-25.363    c0.071-0.14,0.136-0.28,0.201-0.422C495.489,77.039,497.606,39.786,478.504,20.684z M192.798,23.273L192.798,23.273h186.034    c-10.864,4.56-21.462,9.73-31.319,14.947c-0.605,0.319-1.207,0.638-1.802,0.956c-0.782,0.418-1.562,0.836-2.333,1.253    c-1.325,0.717-2.627,1.429-3.904,2.135c-0.265,0.147-0.528,0.293-0.792,0.44c-1.601,0.889-3.166,1.769-4.681,2.632    c-3.224,1.837-5.379,5.104-5.801,8.791l-2.732,23.936l-5.968-10.004c-1.626-2.725-4.294-4.669-7.388-5.38    c-3.094-0.711-6.343-0.128-8.995,1.616c-35.598,23.388-70.836,51.903-99.223,80.29c-1.672,1.672-3.329,3.361-4.977,5.055    c-0.448,0.461-0.894,0.922-1.341,1.385c-1.424,1.476-2.836,2.954-4.233,4.439c-0.179,0.191-0.364,0.379-0.543,0.57V23.273z     M237.102,342.253l-79.886,16.173l28.71-28.709L237.102,342.253z M140.76,341.971l16.173-79.886l12.536,51.176L140.76,341.971z     M169.525,39.729v109.217H60.308L169.525,39.729z M436.249,488.727h-0.002H43.852V172.218h137.309    c0.388,0,0.769-0.021,1.147-0.058c0.126-0.013,0.248-0.036,0.374-0.052c0.249-0.033,0.499-0.065,0.742-0.114    c0.145-0.029,0.287-0.068,0.431-0.102c0.218-0.051,0.435-0.102,0.648-0.166c0.149-0.044,0.294-0.098,0.442-0.149    c0.143-0.049,0.291-0.091,0.431-0.145l-6.591,82.043l-11.628-47.469c-1.296-5.291-6.116-8.962-11.537-8.866    c-5.447,0.111-10.089,3.985-11.17,9.325l-32.955,162.774c-0.149,0.734-0.202,1.472-0.209,2.207l-41.766,41.766    c-2.292,2.292-3.425,5.303-3.404,8.307c0,0.027-0.003,0.051-0.003,0.078c0,6.427,5.21,11.636,11.636,11.636h275.916    c6.426,0,11.636-5.21,11.636-11.636c0-6.427-5.211-11.636-11.636-11.636h-247.98l22.04-22.039c0.74-0.006,1.485-0.078,2.226-0.227    l162.773-32.955c5.34-1.081,9.215-5.723,9.325-11.17s-3.574-10.241-8.866-11.537l-47.468-11.628l85.786-6.892    c2.58-0.207,5.018-1.268,6.926-3.016c1.331-1.218,2.664-2.453,3.995-3.699c3.992-3.739,7.973-7.592,11.881-11.498    c8.844-8.844,17.654-18.285,26.334-28.217c5.208-5.959,10.37-12.095,15.466-18.385c2.325-2.871,3.149-6.673,2.22-10.249    s-3.498-6.497-6.926-7.874l-8.012-3.217l30.945-7.112c2.083-0.479,3.98-1.519,5.495-2.988c0.505-0.49,0.967-1.027,1.38-1.608    c1.586-2.23,3.145-4.46,4.691-6.69c0.43-0.621,0.855-1.242,1.282-1.863c1.164-1.693,2.316-3.384,3.455-5.076    c0.413-0.614,0.83-1.229,1.24-1.842c1.478-2.212,2.943-4.422,4.378-6.629V488.727z M451.248,118.654l-13.652,27.357    c-0.186,0.342-0.384,0.687-0.571,1.03c-0.987,1.797-1.981,3.597-3.002,5.403c-0.513,0.906-1.047,1.819-1.57,2.728    c-0.72,1.254-1.43,2.507-2.168,3.764c-0.769,1.313-1.564,2.632-2.351,3.949c-0.516,0.862-1.017,1.722-1.541,2.587    c-0.927,1.533-1.882,3.071-2.832,4.608c-0.406,0.656-0.799,1.309-1.209,1.967c-1.091,1.747-2.207,3.499-3.329,5.25    c-0.287,0.45-0.565,0.898-0.855,1.349c-1.073,1.666-2.171,3.336-3.27,5.006c-0.356,0.541-0.702,1.081-1.06,1.623    c-1.091,1.648-2.209,3.297-3.326,4.947c-0.382,0.564-0.752,1.126-1.137,1.691c-1.509,2.214-3.042,4.43-4.595,6.646l-62.77,14.428    c-4.956,1.139-8.598,5.364-8.994,10.434c-0.396,5.069,2.546,9.809,7.265,11.705l27.62,11.093    c-9.88,11.586-19.952,22.519-30.058,32.624c-4.016,4.017-8.114,7.972-12.217,11.795l-109.407,8.789L400.414,115.23    c4.544-4.544,4.544-11.912,0-16.456c-4.545-4.544-11.911-4.544-16.457,0L199.763,282.967l8.789-109.406    c1.505-1.616,3.044-3.227,4.586-4.835c2.375-2.479,4.774-4.947,7.209-7.382c24.619-24.619,54.632-49.36,85.453-70.516    l17.327,29.042c2.078,3.483,5.772,5.574,9.704,5.672c0.906,0.022,1.826-0.061,2.74-0.258c4.879-1.051,8.546-5.097,9.111-10.056    l5.964-52.246c0.095-0.052,0.19-0.104,0.285-0.156c1.388-0.767,2.767-1.517,4.14-2.259c0.528-0.285,1.054-0.565,1.581-0.847    c0.967-0.517,1.929-1.025,2.888-1.528c0.574-0.301,1.149-0.603,1.72-0.9c1.043-0.541,2.077-1.069,3.11-1.594    c0.905-0.46,1.806-0.912,2.703-1.359c0.784-0.391,1.567-0.781,2.346-1.162c0.808-0.396,1.61-0.783,2.411-1.169    c0.512-0.247,1.023-0.491,1.532-0.733c0.913-0.434,1.827-0.868,2.732-1.289c0.09-0.042,0.178-0.081,0.268-0.123    c29.148-13.538,53.96-20.215,70.476-18.68c0.412,0.038,0.823,0.054,1.232,0.049c6.021,0.756,10.764,2.7,13.976,5.914    C473.2,48.292,469.162,78.756,451.248,118.654z"></path>
            <path d="M427.694,80.617c-0.148-0.733-0.369-1.466-0.66-2.176c-0.291-0.698-0.653-1.373-1.071-2.001    c-0.419-0.64-0.908-1.233-1.443-1.769c-0.535-0.535-1.13-1.024-1.77-1.455c-0.628-0.419-1.303-0.78-2.012-1.071    c-0.699-0.291-1.431-0.512-2.176-0.663c-3.782-0.756-7.796,0.489-10.497,3.188c-2.175,2.164-3.409,5.155-3.409,8.227    c0,0.756,0.071,1.524,0.221,2.269c0.15,0.745,0.371,1.478,0.662,2.176c0.291,0.71,0.653,1.385,1.071,2.013    c0.431,0.64,0.919,1.233,1.455,1.769c2.164,2.164,5.156,3.409,8.227,3.409c0.756,0,1.526-0.081,2.269-0.233    c0.745-0.14,1.478-0.372,2.176-0.663c0.709-0.291,1.384-0.652,2.012-1.07c0.64-0.419,1.235-0.908,1.77-1.443    c0.535-0.535,1.024-1.129,1.443-1.769c0.418-0.628,0.78-1.303,1.071-2.013c0.291-0.698,0.511-1.431,0.662-2.176    c0.151-0.745,0.233-1.513,0.233-2.269S427.845,81.373,427.694,80.617z"></path>
            <path d="M399.165,419.328c-0.151-0.745-0.372-1.478-0.663-2.188c-0.291-0.698-0.652-1.373-1.071-2.001    c-0.419-0.64-0.908-1.233-1.443-1.769c-0.535-0.535-1.139-1.024-1.769-1.443c-0.64-0.419-1.315-0.78-2.013-1.071    c-0.698-0.291-1.43-0.524-2.176-0.663c-1.501-0.303-3.048-0.303-4.549,0c-0.746,0.14-1.479,0.372-2.176,0.663    c-0.699,0.291-1.374,0.652-2.013,1.071c-0.628,0.419-1.233,0.908-1.769,1.443c-0.535,0.535-1.024,1.129-1.443,1.769    c-0.419,0.628-0.78,1.303-1.071,2.001c-0.291,0.71-0.512,1.443-0.663,2.188c-0.151,0.745-0.233,1.513-0.233,2.269    s0.081,1.524,0.233,2.269c0.151,0.745,0.372,1.478,0.663,2.176c0.291,0.71,0.652,1.385,1.071,2.013    c0.419,0.64,0.908,1.233,1.443,1.769s1.139,1.024,1.769,1.443c0.64,0.419,1.315,0.78,2.013,1.071    c0.698,0.291,1.43,0.524,2.176,0.675c0.755,0.151,1.513,0.221,2.281,0.221c0.755,0,1.524-0.07,2.268-0.221    c0.746-0.151,1.479-0.384,2.176-0.675c0.699-0.291,1.374-0.652,2.013-1.071c0.628-0.419,1.233-0.908,1.769-1.443    s1.024-1.129,1.443-1.769c0.419-0.628,0.78-1.303,1.071-2.013c0.291-0.698,0.512-1.431,0.663-2.176    c0.151-0.745,0.233-1.513,0.233-2.269C399.398,420.841,399.316,420.073,399.165,419.328z"></path>
        </svg>
};
const SolaAscean = ({ ascean, userProfile, deleteAscean, loading, accordion, handleAsceanCreate }: Props) => {

     return (
        <React.Fragment>
        <Row className="justify-content-center my-3">
        <Col className="stat-block wide">
        <hr className="orange-border" />
        <div className="section-left">
        { userProfile ? ( 
            <>
                {/* <AsceanModal ascean={ascean} link={'/Solo/'} symbol={Symbols.play} /> */}
                <AsceanModal ascean={ascean} link={'/Story/'} symbol={Symbols.phaser} />
                <Delete ascean={ascean} deleteAscean={deleteAscean} />
                <Update ascean={ascean} symbol={Symbols.update} />
                {Symbols.space}
            </>
        ) : ( '' ) }
        { accordion === 'Tight' ? (
            <>
            <div className="creature-heading">
                <h1>{ascean.name}</h1>
                <h2 className='ascean-description'>{ascean.description}</h2>
            </div>
            <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" />
            </> 
        ) : accordion === 'Lean' ? (
            <>
                <div className="creature-heading">
                    <h1>{ascean.name}</h1>
                    <h2 className='ascean-description'>{ascean.description}</h2>
                </div>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" /> 
                {Symbols.space}
                <div className="property-line first">
                    <h4>Experience</h4>
                    <p> {ascean.experience} / {ascean.level * 1000}</p>
                </div>
                <div className="property-line">
                    <h4>Level</h4>
                    <p> {ascean.level}</p>
                </div>
                <div className="property-line">
                    <h4>High Score</h4>
                    <p> {ascean.high_score}</p>
                </div>
                <div className="property-line">
                    <h4>Faith</h4>
                    <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
                </div>
                <div className="property-line last">
                    <h4>Mastery</h4>
                    <p> {ascean.mastery}</p>
                </div>
            </> 
        ) : accordion === 'Half' ? (
            <>
                <div className="creature-heading">
                    <h1>{ascean.name}</h1>
                    <h2 className='ascean-description'>{ascean.description}</h2>
                </div>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" />
                {Symbols.space}
                <div className="property-line first">
                    <h4>Experience</h4>
                    <p> {ascean.experience} / {ascean.level * 1000}</p>
                </div>
                <div className="property-line">
                    <h4>Level</h4>
                    <p> {ascean.level}</p>
                </div>
                <div className="property-line">
                    <h4>High Score</h4>
                    <p> {ascean.high_score}</p>
                </div>
                <div className="property-line">
                    <h4>Faith</h4>
                    <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
                </div>
                <div className="property-line last">
                    <h4>Mastery</h4>
                    <p> {ascean.mastery}</p>
                </div>
                {Symbols.space}
                <div className="actions mt-1">
                <AsceanAttributeCompiler ascean={ascean} />
                {Symbols.space}
                <AsceanImageCard
                    weapon_one={ascean.weapon_one}
                    weapon_two={ascean.weapon_two}
                    weapon_three={ascean.weapon_three}
                    shield={ascean.shield}
                    helmet={ascean.helmet}
                    chest={ascean.chest}
                    legs={ascean.legs}
                    amulet={ascean.amulet}
                    ring_one={ascean.ring_one}
                    ring_two={ascean.ring_two}
                    trinket={ascean.trinket}
                    loading={loading}
                />
                </div>
            </>
        ) : (
            <>
                <div className="creature-heading">
                    <h1>{ascean.name}</h1>
                    <h2 className='ascean-description'>{ascean.description}</h2>
                </div>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} id="ascean-home-pic" />
                {Symbols.space}
                <div className="property-line first">
                    <h4>Experience</h4>
                    <p> {ascean.experience} / {ascean.level * 1000}</p>
                </div>
                <div className="property-line">
                    <h4>Level</h4>
                    <p> {ascean.level}</p>
                </div>
                <div className="property-line">
                    <h4>High Score</h4>
                    <p> {ascean.high_score}</p>
                </div>
                <div className="property-line">
                    <h4>Faith</h4>
                    <p> {ascean.faith.charAt(0).toUpperCase() + ascean.faith.slice(1)}</p>
                </div>
                <div className="property-line last">
                    <h4>Mastery</h4>
                    <p> {ascean.mastery}</p>
                </div>
                {Symbols.space}
                <div className="actions mt-1">
                <AsceanAttributeCompiler ascean={ascean}  />
                {Symbols.space}
                <AsceanImageCard
                    weapon_one={ascean.weapon_one}
                    weapon_two={ascean.weapon_two}
                    weapon_three={ascean.weapon_three}
                    shield={ascean.shield}
                    helmet={ascean.helmet}
                    chest={ascean.chest}
                    legs={ascean.legs}
                    amulet={ascean.amulet}
                    ring_one={ascean.ring_one}
                    ring_two={ascean.ring_two}
                    trinket={ascean.trinket}
                    loading={loading}
                    />
                </div> 
                <div className="top-stats">
                    {Symbols.space}
                </div>
                <AsceanStatCompiler ascean={ascean} />
                { userProfile ? ( 
                    <>
                        <div className="actions">
                        <h3>Communal</h3>
                        </div>
                        <div className="property-line first">
                        <h4>Visible to the Community ? </h4>
                        <p>{ascean.visibility.charAt(0).toUpperCase() + ascean.visibility.slice(1)}</p>
                        </div>
                        <div className="property-line first">
                        <h4>Shareable to the Community ? </h4>
                        <p>{ascean.shareable.charAt(0).toUpperCase() + ascean.shareable.slice(1)}</p>
                        </div>
                    </>
                ) : ( '' ) }
            </>
        ) }
            </div> 
            <hr className='orange-border bottom' />
        </Col>
        </Row>
        </React.Fragment>
    );
};

export default SolaAscean;