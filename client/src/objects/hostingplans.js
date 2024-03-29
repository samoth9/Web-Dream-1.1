import Item from "./item";

const MONTHLY_DISCOUNT_RATE = 1;
const ANNUAL_DISCOUNT_RATE = .75;
const SEMI_ANNUAL_DISCOUNT_RATE = .85;

const STARTER_PRICE = 4;
const BUSINESS_PRICE = 8;
const HYPER_PRICE = 15;

export default class HostingPlan extends Item {
    constructor(name, cycle, description) {
        super(name)
        this.description = description;
        this.cycle = cycle;
    }

    discountedTotal = () => { 
        return this.getMonthly() * this.getNumMonthsInCycle() * this.getDiscountRate()
    } 
    discountedMonthly = () => {
        return this.getMonthly() * MONTHLY_DISCOUNT_RATE
    }
    discountedSemiAnnual = () => {
        return this.getMonthly() * 6 * SEMI_ANNUAL_DISCOUNT_RATE
    }
    discountedAnnual = () => {
        return this.getMonthly() * 12 *  ANNUAL_DISCOUNT_RATE
    }
    total = () => {
        return this.getMonthly() * this.getNumMonthsInCycle();
    }
    setCycle = (cycle) => {
        this.cycle = cycle
    }

    getInvoiceItem = () => {
        return {name: this.name, price: this.total(), description: this.description}
    }
    getDiscountItem = () => {
        let discountAmount = this.discountedTotal() - this.total();
        if(discountAmount < 0) {
            return {name: 'Billing Cycle Discount', price: discountAmount, description: ((this.getDiscountRate()*(-1)+1)*100).toFixed(0) + '% off'}
        } else {
            return {name: '', price: 0, description: ''}
        }
    }

    // Helper Functions
    getNumMonthsInCycle = () => {
        switch(this.cycle) {
            case('Annually'):
                return 12;
            case('Semi-Annually'):
                return 6;
            case('Monthly'):
                return 1;
            default:
                return 1;
        }
    }
    getDiscountRate = () => {
        switch(this.cycle) {
            case('Annually'):
                return ANNUAL_DISCOUNT_RATE;
            case('Semi-Annually'):
                return SEMI_ANNUAL_DISCOUNT_RATE;
            case('Monthly'):
                return MONTHLY_DISCOUNT_RATE;
            default:
                return 1;
        }
    }
    getMonthly = () => {
        switch(this.name){
            case('Starter'):
                return STARTER_PRICE;
            case('Business'):
                return BUSINESS_PRICE;
            case('Hyper'):
                return HYPER_PRICE;
            default:
                throw 'Cannot get monthly rate of invalid plan name: ' + this.name;
        }
    }
}