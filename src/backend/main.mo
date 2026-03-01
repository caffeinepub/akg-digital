import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Array "mo:core/Array";

actor {
  type Submission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(sub1 : Submission, sub2 : Submission) : Order.Order {
      Int.compare(sub1.timestamp, sub2.timestamp);
    };
  };

  var submissions = Array.empty<Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Bool {
    let newSubmission : Submission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    submissions := submissions.concat([newSubmission]);
    true;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.sort();
  };

  public query ({ caller }) func getTotalSubmissions() : async Nat {
    submissions.size();
  };
};
