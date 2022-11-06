// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MortgageContract {

    uint256 counter = 0;

    struct Investor {
        address account;
        uint256 amount;
    }

    mapping(uint256 => Investor[]) investors;

    enum Status { Review, Listed, ReadyToLend, Approved, Paid }

    struct Location {
        int256 latitude;
        int256 longitude;
    }

    struct Mortgage {
        uint256 id;
        address borrower;
        uint256 propertyValue;
        uint256 mortgageAmount;
        uint256 downPayment;
        uint256 debtIncomeRatio;
        uint256 area;
        uint256 interestRate;
        Location location;
        Status status;

        uint256 fund;
    }

    mapping(uint256 => Mortgage) mortgages;

    function requestMortgage(
        uint256 _propertyValue,
        uint256 _mortgageAmount,
        uint256 _downPayment,
        uint256 _debtIncomeRatio,
        uint256 _area,
        uint256 _interestRate,
        int256 _latitude,
        int256 _longitude
        )
        public {

        mortgages[counter] = Mortgage(
            counter,
            msg.sender,
            _propertyValue,
            _mortgageAmount,
            _downPayment,
            _debtIncomeRatio,
            _area,
            _interestRate,
            Location(_latitude, _longitude),
            Status.Review,
            0
        );

        counter++;
    }

    function listMortgageRequest(uint256 _mortgageId) public {
        require(mortgages[_mortgageId].status == Status.Review, "Mortgage cannot be listed.");
        mortgages[_mortgageId].status = Status.Listed;
    }

    function invest(uint256 _mortgageId) public payable {

        mortgages[_mortgageId].fund += msg.value;

        if(mortgages[_mortgageId].fund == mortgages[_mortgageId].mortgageAmount) {
            mortgages[_mortgageId].status = Status.ReadyToLend;
        }

        investors[_mortgageId].push( Investor(msg.sender, msg.value));
    }


    function approveMortgage(uint256 _mortgageId) public {
        require(mortgages[_mortgageId].status == Status.ReadyToLend, "Mortgage cannot be approved.");
        mortgages[_mortgageId].status = Status.Approved;
    }

    function payMortgage(uint256 _mortgageId) public payable {
        require(msg.value == mortgages[_mortgageId].mortgageAmount, "Payment must be equal to mortgage debt.");
        require(mortgages[_mortgageId].status == Status.Approved, "Payment not allowed yet.");
        mortgages[_mortgageId].status = Status.Paid;
    }

    function getMortgage(uint256 id) public view returns(Mortgage memory) {
        return mortgages[id];
    }
}
