# == Schema Information
#
# Table name: pd_international_optins
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  form_data  :text(65535)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_pd_international_optins_on_user_id  (user_id)
#

require 'international_optin_people'

class Pd::InternationalOptin < ApplicationRecord
  include Pd::Form

  def self.required_fields
    [
      :first_name,
      :last_name,
      :email,
      :opt_in
    ]
  end

  def self.options
    entry_keys = {
      gender: %w(male female non_binary not_listed none),
      schoolCountry: %w(canada chile israel malaysia mexico thailand),
      ages: %w(ages_under_6 ages_7_8 ages_9_10 ages_11_12 ages_13_14 ages_15_16 ages_17_18 ages_19_over),
      subjects: %w(cs ict math science history la efl music art),
      resources: %w(bootstrap codecademy csfirst khan kodable lightbot scratch tynker),
      robotics: %w(grok kodable lego microbit ozobot sphero raspberry wonder),
      workshopCourse: %w(csf_af csf_express),
      optIn: %w(opt_in_yes opt_in_no)
    }

    entries = Hash[entry_keys.map {|k, v| [k, v.map {|s| I18n.t("pd.form_entries.#{k.to_s.underscore}.#{s.underscore}")}]}]

    entries[:workshopOrganizer] = get_international_optin_partners
    entries[:workshopFacilitator] = get_international_optin_facilitators

    super.merge(entries)
  end

  def self.labels
    keys = %w(
      firstName
      preferredFirstName
      firstName
      firstNamePreferred
      lastName
      email
      emailAlternate
      gender
      schoolName
      schoolCity
      schoolCountry
      ages
      subjects
      resources
      robotics
      workshopOrganizer
      workshopFacilitator
      workshopCourse
      optIn
    )
    Hash[keys.collect {|v| [v, I18n.t("pd.form_labels.#{v.underscore}")]}]
  end

  def email
    sanitize_form_data_hash[:email]
  end

  def opt_in?
    sanitize_form_data_hash[:opt_in].downcase == "yes"
  end
end
