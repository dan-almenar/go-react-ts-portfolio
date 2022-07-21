package contactdata

import (
	"encoding/json"
	"io"
)

type Comment struct {
	Date      int64  `json:"date"`
	Email     string `json:"email"`
	Subject   string `json:"subject"`
	Message   string `json:"message"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName,omitempty"`
}

type AllComments []Comment

func (c *Comment) FromJSON(r io.Reader) error {
	return json.NewDecoder(r).Decode(c)
}

func (c *Comment) ToJSON(w io.Writer) error {
	return json.NewEncoder(w).Encode(c)
}

func (c *AllComments) FromJSON(r io.Reader) error {
	return json.NewDecoder(r).Decode(c)
}

func (c *AllComments) ToJSON(w io.Writer) error {
	return json.NewEncoder(w).Encode(c)
}
