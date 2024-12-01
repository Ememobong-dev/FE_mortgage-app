"use client"

import {Plus_Jakarta_Sans} from 'next/font/google';
import Image from "next/image";
import calculator from "@/assets/images/icon-calculator.svg";
import React, {useReducer, useState} from "react";
import {CardResult, CardRightSide} from "@/components/CardRightSide";
import {INITIAL_STATE, formReducer} from "../../reducers/formReducer";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'], // Add subsets as needed
    weight: ['400', '500', '700'], // Include the weights you plan to use
    variable: '--font-plus-jakarta-sans', // Optional: for custom CSS variable
});


export default function Home() {
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
    const [resultSubmitted, setResultSubmitted] = useState(false);
    const [result, setResult] = useState({
        monthlyPayment: 0,
        totalPayment: 0,
    });

    let isError = false;

    // Calculate Monthly repayment
    const calculateResults = () => {
        const mortgage_amount = parseFloat(state.amount.value);
        const annually_term = parseInt(state.term.value);
        const monthly_rate = parseFloat(state.rate.value) / 100;
        const mortgage_type = state.mortgageType.value;

        const monthlyRate = monthly_rate / 12; // Monthly interest rate
        const totalMonths = annually_term * 12; // Total number of payments

        let monthlyPayment = 0;
        let totalPayment = 0;

        if (mortgage_type === "repayment") {
            const payment_calc =
                (mortgage_amount *
                    (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

            monthlyPayment = parseFloat(payment_calc.toFixed(2));
            totalPayment = parseFloat((payment_calc * totalMonths).toFixed(2));
        } else if (mortgage_type === "interest") {
           const interest_calc = mortgage_amount * monthlyRate
            monthlyPayment = parseFloat(interest_calc.toFixed(2));
            totalPayment = parseFloat((interest_calc * totalMonths).toFixed(2));
        }

        // format number
        const formattedMonthlyPayment = new Intl.NumberFormat('en-US').format(monthlyPayment);
        const formattedTotalPayment = new Intl.NumberFormat('en-US').format(totalPayment);

        // Update results in state
        setResult({
            monthlyPayment: formattedMonthlyPayment,
            totalPayment: formattedTotalPayment,
        });
    };


    const handleFormSubmit = () => {
        // Validate input tags
        if (!state.amount.value) {
            dispatch({type: "UPDATE_ERROR", payload: {errorMessage: "Mortgage Amount is required", error: true, name: "amount"}})
            isError = true;
        }
        if (!state.term.value) {
            dispatch({type: "UPDATE_ERROR", payload: {errorMessage: "Mortgage Term is required", error: true, name: "term"}})
            isError = true;
        }
        if (!state.rate.value) {
            dispatch({type: "UPDATE_ERROR", payload: {errorMessage: "Mortgage Rate is required", error: true, name: "rate"}})
            isError = true;
        }
        if (!state.mortgageType.value) {
            dispatch({type: "UPDATE_ERROR", payload: {errorMessage: "Mortgage Type is required", error: true, name: "mortgageType"}})
            isError = true;
        }

        if(!isError) {
            calculateResults();
            setResultSubmitted(true);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value_  = e.target.value;
            dispatch({
                type: "CHANGE_INPUT",
                payload: {name: e.target.name, value: value_},
            });
            setResultSubmitted(false);
    };

    const handleClearAll = () => {
        dispatch({type: "RESET_INPUT"})
        setResultSubmitted(false)
    }


    return (
        <div className={`${plusJakartaSans.variable} card_row`}>
            <div className="card_col card_1">
                <div className="card_inner_1">
                    <div>
                        <div className='mi_title'>
                            <h3>Mortgage Calculator</h3>
                            <p onClick={handleClearAll} className='underline pointer'>Clear All</p>
                        </div>
                        <div className='mi_body'>
                            <div className="mi_grouped_input">
                                <label htmlFor="mortgageAmount">Mortgage Amount</label>
                                <div className={` ${state.amount.error ? 'error_input' : ''} grouped_input`}>
                                    <span className="span_input">€ </span>
                                    <input className='input_' value={state.amount.value} onChange={handleInputChange} name="amount" type="text"/>
                                </div>
                                {state.amount.error ? <p className={"text_red"}>{state.amount.errorMessage}</p> : ""}
                            </div>
                            <div className="input_grid">
                                <div className="mi_grouped_input">
                                    <label htmlFor="mortgageTerm">Mortgage Term</label>
                                    <div className={` ${state.term.error ? 'error_input' : ''} grouped_input `}>
                                        <input className='input_' value={state.term.value}
                                               onChange={handleInputChange} name="term" type="text"/>
                                        <span className="span_input">years</span>
                                    </div>
                                    {state.term.error ? <p className={"text_red"}>{state.term.errorMessage}</p> : ""}
                                </div>
                                <div className="mi_grouped_input">
                                    <label htmlFor="interestRate">Interest Rate</label>
                                    <div className={` ${state.rate.error ? 'error_input' : ''} grouped_input `}>
                                        <input className='input_' value={state.rate.value} onChange={handleInputChange} name="rate" type="text"/>
                                        <span className="span_input">% </span>
                                    </div>
                                    {state.rate.error ? <p className={"text_red"}>{state.rate.errorMessage}</p> : ""}
                                </div>
                            </div>
                            <div className="input_radio">
                                <div className="mi_grouped_input">
                                    <label htmlFor="mortgageType">Mortgage Type</label>
                                    <div className="grouped_input radio_btns">
                                        <input className='radio_' type="radio" id="repayment"
                                               onChange={handleInputChange} name="mortgageType"
                                               value="repayment"
                                               checked={state.mortgageType.value === "repayment"}
                                        />
                                        <label htmlFor="repayment">Repayment</label><br/>
                                    </div>
                                    <div className="grouped_input radio_btns">
                                        <input className='radio_' type="radio" id="interest"
                                               onChange={handleInputChange} name="mortgageType"
                                               value="interest"
                                               checked={state.mortgageType.value === "interest"}
                                        />
                                        <label htmlFor="interest">Interest Only</label><br/>
                                    </div>
                                    {state.mortgageType.error ? <p className={"text_red"}>{state.mortgageType.errorMessage}</p> : ""}
                                </div>
                            </div>

                            <div className="submit_btn">
                                <button onClick={handleFormSubmit}>
                              <span>
                                <Image src={calculator} alt='calculator icon'/>
                              </span>
                                    <p>Calculate Repayments</p>
                                </button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="card_col card_2">
                <div className={` ${!resultSubmitted && "card_inner_result"} card_inner_2`}>
                    {
                        resultSubmitted ? <CardResult totalRepayment={result.totalPayment} monthlyRepayment={result.monthlyPayment} /> : <CardRightSide/>
                    }
                </div>
            </div>
        </div>
    );
}
