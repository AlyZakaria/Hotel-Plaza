import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import SimCardRoundedIcon from "@mui/icons-material/SimCardRounded";
import { styled } from "@mui/system";

const FormGrid = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState("");

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap sx={{ width: "50%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
            height: { xs: 300, sm: 350, md: 375 },
            width: "100%",
            borderRadius: "20px",
            border: "1px solid ",
            borderColor: "divider",
            backgroundColor: "background.paper",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Credit card</Typography>
            <CreditCardRoundedIcon sx={{ color: "text.primary" }} />
          </Box>
          <SimCardRoundedIcon
            sx={{
              fontSize: { xs: 48, sm: 56 },
              transform: "rotate(90deg)",
              color: "text.secondary",
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: 2,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-number" required>
                Card number
              </FormLabel>
              <OutlinedInput
                id="card-number"
                autoComplete="card-number"
                placeholder="0000 0000 0000 0000"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </FormGrid>
            <FormGrid sx={{ maxWidth: "20%" }}>
              <FormLabel htmlFor="cvv" required>
                CVV
              </FormLabel>
              <OutlinedInput
                id="cvv"
                autoComplete="CVV"
                placeholder="123"
                required
                value={cvv}
                onChange={handleCvvChange}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-name" required>
                Name
              </FormLabel>
              <OutlinedInput
                id="card-name"
                autoComplete="card-name"
                placeholder="John Smith"
                required
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-expiration" required>
                Expiration date
              </FormLabel>
              <OutlinedInput
                id="card-expiration"
                autoComplete="card-expiration"
                placeholder="MM/YY"
                required
                value={expirationDate}
                onChange={handleExpirationDateChange}
              />
            </FormGrid>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
}
