import Image from 'next/image';
import React from 'react';
import illustration from "@/assets/images/illustration-empty.svg"

export const CardRightSide = () => {
  return (
    <div className='card_right_inner'>
        <div>
            <Image src={illustration} alt='img' />
        </div>
        <div>
            <h3>Results shown here</h3>
        </div>
        <div>
            <p className='text_dim'>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
        </div>
    </div>
  )
}

export const CardResult = ({monthlyRepayment, totalRepayment}: {monthlyRepayment : number, totalRepayment : number}   ) => {
    return (
        <>
            <div className={"card_result"}>
                <div className={"title"}>
                    <h3> Your Results</h3>
                </div>
                <div>
                    <p className={"result_text"}>
                        Your results are shown below based on the information you provided.
                        To adjust the results, edit the form and click “calculate repayments” again.
                    </p>
                </div>
                <div className={"show_result"}>
                    <div>
                        <p className={"result_text"}>Your monthly repayments</p>
                        <h2 className={"result_num "}>
                            €{monthlyRepayment}
                        </h2>
                    </div>
                    <hr/>
                    <div>
                        <p className={"result_text"}>Total you'll repay over the term</p>
                        <h2 className={"owing_num"}>
                            €{totalRepayment}
                        </h2>
                    </div>
                </div>
            </div>

        </>
    )
}



