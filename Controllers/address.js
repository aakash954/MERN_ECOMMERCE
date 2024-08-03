import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
    try {
        let { fullName, address, city, state, country, pincode, phoneNumber } = req.body;
        let userId = req.user;
        const userAddress = await Address.create({
            userId,
            fullName,
            address,
            city,
            state,
            country,
            pincode,
            phoneNumber
        });

        res.json({ message: "Address added", userAddress });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAddress = async (req, res) => {
    let userId = req.user;
    try {
        let address = await Address.find({ userId }).sort({ CreatedAt: -1 });
        res.json({ message: 'address', userAddress:address[0]});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

