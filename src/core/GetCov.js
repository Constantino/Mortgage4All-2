import React from 'react' 
import axios from 'axios';

class GetCov extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            _todayValue: null,
            _lastWeekValue: null,
            _lastMonthValue: null,
            _currentValue: null,
            TodayPercentage: null,
            LastWeekPercentage: null,
            LastMonthPercentage: null,

        }
    }

    async getData(){
        try {
            const response = await axios.get('https://api.covalenthq.com/v1/43114/address/0x89da56e409dDef3C52BdCfBeFC9b595870880bAA/portfolio_v2/?quote-currency=USD&format=JSON&key=ckey_4dc37b7f69b2402b817bb51c5a0');
            //console.log(response.data.data)
            const _todayValue = await this.getTodayValue(response.data.data);
            const _lastWeekValue = await this.getLastWeekValue(response.data.data);
            const _lastMonthValue = await this.getLastMonthValue(response.data.data);
            const _currentValue = await this.getCurrentValue(response.data.data);
            
            console.log(_todayValue,_lastWeekValue,_lastMonthValue,_currentValue)
            return([_todayValue,_lastWeekValue,_lastMonthValue,_currentValue])
            //console.log(response.data.data);
            /*setItems(response.data.data);
            
            setCurrentValue(_currentValue);
            setTodayValue(_todayValue);
            setLastWeekValue(_lastWeekValue);
            setLastMonthValue(_lastMonthValue);*/
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }

    async getCurrentValue(items){
        return items.items[0].holdings[0].quote_rate;
    }
    
    async getTodayValue(items){
    
        let i_1 = items.items[0].holdings[0].quote_rate;
        let i_0 = items.items[0].holdings[1].quote_rate;
        this.setState({TodayPercentage: (i_1 / i_0 - 1) * 100 })
    
        return i_1 - i_0;
    };
    
    async getLastWeekValue(items){
        let i_1 = items.items[0].holdings[0].quote_rate;
        let i_0 = items.items[0].holdings[6].quote_rate;
        this.setState({LastWeekPercentage: (i_1 / i_0 - 1) * 100});
    
        return i_1 - i_0;
    };
    
    async getLastMonthValue(items){
        let i_1 = items.items[0].holdings[0].quote_rate;
        let i_0 = items.items[0].holdings[29].quote_rate;
        this.setState({LastMonthPercentage: (i_1 / i_0 - 1) * 100})

        return i_1 - i_0;
    };




}

export default GetCov;




    /*
const getData = async () => {
		
    //using axios
    try {
    const response = await axios.get('https://api.covalenthq.com/v1/43114/address/0x89da56e409dDef3C52BdCfBeFC9b595870880bAA/portfolio_v2/?quote-currency=USD&format=JSON&key=ckey_4dc37b7f69b2402b817bb51c5a0');
    //console.log(response.data.data);
    setItems(response.data.data);
    
    let _todayValue = await getTodayValue(response.data.data);
    let _lastWeekValue = await getLastWeekValue(response.data.data);
    let _lastMonthValue = await getLastMonthValue(response.data.data);
    
    let _currentValue = await getCurrentValue(response.data.data);

    setCurrentValue(_currentValue);
    setTodayValue(_todayValue);
    setLastWeekValue(_lastWeekValue);
    setLastMonthValue(_lastMonthValue);

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

const getCurrentValue = async (items) => {
    return items.items[0].holdings[0].quote_rate;
}

  const getTodayValue = async (items) => {

    let i_1 = items.items[0].holdings[0].quote_rate;
    let i_0 = items.items[0].holdings[1].quote_rate;
    setTodayPercentage((i_1 / i_0 - 1) * 100);

    return i_1 - i_0;
};

const getLastWeekValue = async (items) => {
    let i_1 = items.items[0].holdings[0].quote_rate;
    let i_0 = items.items[0].holdings[6].quote_rate;

    setLastWeekPercentage((i_1 / i_0 - 1) * 100);

    return i_1 - i_0;
};

const getLastMonthValue = async (items) => {
    let i_1 = items.items[0].holdings[0].quote_rate;
    let i_0 = items.items[0].holdings[29].quote_rate;

    setLastMonthPercentage((i_1 / i_0 - 1) * 100);

    return i_1 - i_0;
};*/


